module "network" {
  source             = "./modules/network"
  prefix_name        = "devops-chair"
  vpc_name           = "devops-chair-vpc"
  vpc_cidr           = "10.0.0.0/16"
  public_subnets     = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets    = ["10.0.10.0/24", "10.0.11.0/24"]
  availability_zones = ["us-east-1a", "us-east-1b"]
}

module "nat" {
  source                    = "./modules/nat"
  prefix_name               = "devops-chair"
  vpc_id                    = module.network.vpc_id
  subnet_id                 = module.network.public_subnet_ids[0]
  private_route_table_id    = module.network.private_route_table_id
  private_subnets_id        = module.network.private_subnet_ids
  iam_instance_profile_name = module.security.ssm_instance_profile_name
  depends_on                = [module.network]
}


module "s3" {
  source      = "./modules/s3"
  bucket_name = "devops-chair-registry"
  region      = "us-east-1"
  tags = {
    Name = "devops-chair-registry"
  }
}


module "security" {
  source               = "./modules/security"
  prefix_name          = "devops-chair"
  registry_bucket_name = module.s3.bucket_name
  vpc_id               = module.network.vpc_id
  vpc_cidr             = module.network.vpc_cidr
}

module "control_plane" {
  source                    = "./modules/compute"
  cluster_name              = "devops-chair"
  node_role                 = "control-plane"
  instance_type             = "t3.medium"
  instance_count            = 1
  vpc_id                    = module.network.vpc_id
  subnet_id                 = module.network.private_subnet_ids[0]
  security_group_id         = module.security.control_plane_sg_id
  iam_instance_profile_name = module.security.ssm_instance_profile_name
}

module "workers" {
  source                    = "./modules/compute"
  vpc_id                    = module.network.vpc_id
  cluster_name              = "devops-chair"
  instance_type             = "t3.small"
  node_role                 = "worker"
  instance_count            = 2
  iam_instance_profile_name = module.security.worker_instance_profile_role
  security_group_id         = module.security.worker_sg_id
  subnet_id                 = module.network.private_subnet_ids[1]
}

resource "aws_s3_bucket" "ssm_transfers" {
  bucket        = "devops-chair-ssm-transfers"
  force_destroy = true
}


module "github_oidc" {
  source = "./modules/github_oidc"

  prefix_name = "devops-chair"
  subject_claims = [
    "repo:lesanpi/devops-chair:*",
    "repo:lesanpi@42817881/devops-chair@1350636462:*"

  ]
  policy_arns = [
    "arn:aws:iam::aws:policy/AdministratorAccess"
  ]
}

module "ecr_portfolio" {
  source          = "./modules/ecr"
  repository_name = "devops-chair/portfolio"
}
