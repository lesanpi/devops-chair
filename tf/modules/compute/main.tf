data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # ID oficial de Canonical
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

resource "aws_instance" "node" {
  count                = var.instance_count
  ami                  = data.aws_ami.ubuntu.id
  instance_type        = var.instance_type
  subnet_id            = var.subnet_id
  security_groups      = [var.security_group_id]
  iam_instance_profile = var.iam_instance_profile_name
  tags = merge(
    {
      Name = var.instance_count > 1 ? "${var.cluster_name}-${var.node_role}-${count.index + 1}" : "${var.cluster_name}-${var.node_role}"
      Role = var.node_role
    },
    var.extra_tags
  )
}
