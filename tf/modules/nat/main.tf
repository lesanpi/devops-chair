data "aws_ami" "nat_ami" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["al2023-ami-2023.*-arm64"]
  }
}

resource "aws_security_group" "nat" {
  name        = "${var.prefix_name}-nat-security-group"
  description = "Security group for the NAT instance"
  vpc_id      = var.vpc_id
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "nat" {
  ami               = data.aws_ami.nat_ami.id
  instance_type     = var.instance_type
  subnet_id         = var.subnet_id
  security_groups   = [aws_security_group.nat.id]
  source_dest_check = false
  tags = {
    Name = "${var.prefix_name}-nat-instance"
    Role = "nat"
  }
  iam_instance_profile = var.iam_instance_profile_name
}

resource "aws_eip" "nat" {
  domain   = "vpc"
  instance = aws_instance.nat.id
  tags = {
    Name = "${var.prefix_name}-nat-eip"
  }
}


resource "aws_route" "private_nat_route" {
  route_table_id         = var.private_route_table_id
  destination_cidr_block = "0.0.0.0/0"
  network_interface_id   = aws_instance.nat.primary_network_interface_id
}

resource "aws_route_table_association" "private" {
  count          = length(var.private_subnets_id)
  route_table_id = var.private_route_table_id
  subnet_id      = private_subnets[count.index]
}
