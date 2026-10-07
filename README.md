# devops-chair

Kubernetes on EC2, without EKS. A private VPC, a NAT instance, kubeadm, Ansible over SSM, and Argo CD. The API server is not public. Access is an SSM tunnel to `127.0.0.1:6443`.

Terraform builds the network and the instances. Ansible installs the cluster and the platform add-ons. GitHub Actions can run the same Terraform and Ansible entrypoints.

## Architecture

Region `us-east-1`. VPC `10.0.0.0/16`.

| Piece           | Placement                                     | Role                                 |
| --------------- | --------------------------------------------- | ------------------------------------ |
| Public subnets  | `10.0.1.0/24` (1a), `10.0.2.0/24` (1b)        | NAT instance only                    |
| Private subnets | `10.0.10.0/24` (1a), `10.0.11.0/24` (1b)      | Nodes                                |
| NAT             | `t4g.nano` plus an EIP in the public subnet   | Egress. Not a NAT Gateway            |
| Control plane   | 1× `t3.medium`, private                       | kubeadm. Tag `Role=control-plane`    |
| Workers         | 2× `t3.small`, private                        | Tag `Role=worker`                    |
| Access          | SSM                                           | No public SSH, no public IP on nodes |
| Ingress         | ingress-nginx, Helm, `hostNetwork`, DaemonSet | 80/443 from the VPC CIDR only        |
| GitOps          | Argo CD                                       | Upstream install manifest            |
| State           | S3 `devops-chair-terraform`                   | Created before `terraform init`      |

Network, security groups, and install phases: [docs/architecture.md](docs/architecture.md).

## Requirements

Local tooling, pointed at the target account:

- AWS CLI v2 (`aws sts get-caller-identity`)
- Terraform 1.5.x (workflows pin `1.5.0`)
- Session Manager plugin (`session-manager-plugin`)
- Python 3.11, `ansible`, `boto3`, `botocore`
- Collection `amazon.aws`
- `perl`, used by the `Makefile` when rewriting the kubeconfig

```bash
aws --version
terraform version
session-manager-plugin --version
python3 --version

python3 -m pip install --user ansible boto3 botocore
ansible-galaxy collection install amazon.aws
```

```bash
export AWS_REGION=us-east-1
export AWS_DEFAULT_REGION=us-east-1
```

## State bucket

`tf/provider.tf` uses a remote backend:

```hcl
backend "s3" {
  bucket  = "devops-chair-terraform"
  key     = "devops-chair/terraform.tfstate"
  region  = "us-east-1"
  encrypt = true
}
```

That bucket is outside Terraform. `terraform init` fails if it does not exist. Once per account:

```bash
aws s3api create-bucket \
  --bucket devops-chair-terraform \
  --region us-east-1

aws s3api put-bucket-versioning \
  --bucket devops-chair-terraform \
  --versioning-configuration Status=Enabled

aws s3api put-bucket-encryption \
  --bucket devops-chair-terraform \
  --server-side-encryption-configuration \
  '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'
```

`devops-chair-ssm-transfers` is a Terraform resource. It is not created by hand.

## Terraform from a terminal

All commands run in `tf/`.

```bash
cd tf
terraform init
terraform fmt -check
terraform validate
terraform plan
terraform apply
```

`plan` does not change infrastructure. `apply` asks for confirmation and writes state to S3.

Destroy, from the same directory:

```bash
terraform plan -destroy
terraform destroy
```

`destroy` removes instances, the NAT, the VPC, and `devops-chair-ssm-transfers` (`force_destroy = true`). It does not remove `devops-chair-terraform`.

```bash
terraform output
```

`control_plane_ip` and `worker_ips` are private. SSH is not the access path.

Modules and workflows: [docs/terraform.md](docs/terraform.md).

## Terraform from GitHub Actions

Repository secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`. Region is fixed to `us-east-1`.

| Workflow         | Trigger                                             | Steps                           |
| ---------------- | --------------------------------------------------- | ------------------------------- |
| `tf-plan.yml`    | Pull request or push to `main` that touches `tf/**` | `init`, `fmt -check`, `plan`    |
| `tf-apply.yml`   | `workflow_dispatch`, input `confirmacion` = `yes`   | `init`, `apply -auto-approve`   |
| `tf-destroy.yml` | `workflow_dispatch`, input `confirmacion` = `yes`   | `init`, `destroy -auto-approve` |

Any other value of `confirmacion` skips the job. The apply workflow does not run Ansible.

## Ansible

Ansible runs after instances are `running` and registered with SSM. An empty inventory means SSM does not see them yet.

```bash
aws ssm describe-instance-information \
  --query "InstanceInformationList[].{Id:InstanceId,Ping:PingStatus}" \
  --output table
```

The control plane, both workers, and the NAT should show `PingStatus` `Online`.

The workflow uses `ansible/` as its working directory:

```bash
cd ansible
ansible-galaxy collection install amazon.aws
ansible-inventory --graph
ansible-playbook site.yml
```

`site.yml` has six phases:

1. `nat_setup` on the NAT instance.
2. `containerd` and `k8s_base` on the control plane and workers.
3. `control_plane`: `kubeadm init --pod-network-cidr=192.168.0.0/16`.
4. `worker`: join.
5. Helm, then ingress-nginx through Helm (`hostNetwork`, DaemonSet).
6. Argo CD, from the upstream install manifest.

`.github/workflows/ansible.yml` is `workflow_dispatch` with the same `yes` gate. It installs Ansible, boto3, `amazon.aws`, and the Session Manager plugin, prints the inventory, and runs `site.yml`.

Roles and inventory: [docs/ansible.md](docs/ansible.md).

## SSM tunnel and local kubectl

The API server listens on the control plane, port 6443, and that port is open only from the VPC. A workstation reaches it through an SSM port-forward. The session has to stay open. Closing it drops `kubectl`.

Required locally: AWS CLI v2, the Session Manager plugin, `kubectl`, `perl`, and Ansible with the `amazon.aws` collection. The caller needs `ssm:StartSession` on the control-plane instance and `ec2:DescribeInstances`.

```bash
aws sts get-caller-identity
session-manager-plugin --version
export AWS_REGION=us-east-1
export AWS_DEFAULT_REGION=us-east-1
```

The control plane has to be `Online` in Systems Manager. `make tunnel` looks it up by the tag `Role=control-plane`.

Terminal A, from the repo root. Leave it running:

```bash
make tunnel
```

That is `aws ssm start-session` with `AWS-StartPortForwardingSession`, remote port 6443, local port 6443.

Terminal B, from the repo root:

```bash
make fetch-kubeconfig
export KUBECONFIG="$PWD/kubeconfig_aws"
kubectl get nodes
```

`fetch-kubeconfig` copies `/home/ubuntu/.kube/config` from the control plane over SSM, rewrites the server to `https://127.0.0.1:6443`, and sets `insecure-skip-tls-verify: true`. The file holds the `kubernetes-admin` client certificate and key. It stays on the workstation. Do not commit it.

A new shell needs the same export:

```bash
export KUBECONFIG="$PWD/kubeconfig_aws"
```

`kubectl` fails with a connection error when terminal A is closed, and with a certificate error if `KUBECONFIG` still points at a config whose server is the private IP. Repeat `make fetch-kubeconfig` only when the admin kubeconfig on the node has changed.

## Argo CD

Argo CD is installed by `ansible/roles/install_argocd`. The role creates the `argocd` namespace and applies the upstream manifest:

```bash
kubectl create namespace argocd --dry-run=client -o yaml | kubectl apply -f -
kubectl apply -n argocd --server-side --force-conflicts \
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Helm is a separate role. It is used for ingress-nginx only. Phase 6 of `site.yml` is what installs Argo CD. The apply is server-side and can be run again.

Cluster access from a workstation uses two terminals at the repo root. First:

```bash
make tunnel
```

That session stays open. Second:

```bash
make fetch-kubeconfig
export KUBECONFIG="$PWD/kubeconfig_aws"
kubectl get nodes
kubectl -n argocd get pods
```

`fetch-kubeconfig` rewrites the server to `https://127.0.0.1:6443` and sets `insecure-skip-tls-verify`. `kubeconfig_aws` holds the `kubernetes-admin` client certificate and key. It is a local artifact, not a file to commit.

Initial admin password, with the tunnel open:

```bash
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d && echo
```

Install path, UI, and the Ingress manifest: [docs/argocd.md](docs/argocd.md).

## Bring-up order

1. AWS credentials in the shell, or the two repository secrets.
2. Bucket `devops-chair-terraform`.
3. `terraform init` and `terraform apply`.
4. SSM `Online` on all four instances.
5. `ansible-playbook site.yml`.
6. `make tunnel` and `make fetch-kubeconfig`.

`terraform destroy` removes the infrastructure. There is no Ansible teardown playbook.
