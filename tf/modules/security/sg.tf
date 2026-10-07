resource "aws_security_group" "control_plane" {
  name        = "${var.prefix_name}-control-plane-sg"
  description = "Security group for the control plane"
  vpc_id      = var.vpc_id
}


resource "aws_security_group" "worker" {
  name        = "${var.prefix_name}-worker-sg"
  description = "Security group for the worker nodes"
  vpc_id      = var.vpc_id
}

resource "aws_security_group_rule" "worker_ingress" {
  from_port         = 30000
  protocol          = "tcp"
  security_group_id = aws_security_group.worker.id
  to_port           = 32767
  type              = "ingress"
  cidr_blocks       = [var.vpc_cidr]

}

resource "aws_security_group_rule" "control_plane_ingress" {
  from_port         = 6443
  protocol          = "tcp"
  security_group_id = aws_security_group.control_plane.id
  to_port           = 6443
  type              = "ingress"
  cidr_blocks       = [var.vpc_cidr]
}
resource "aws_security_group_rule" "worker_egress" {
  from_port         = 0
  protocol          = "-1"
  security_group_id = aws_security_group.worker.id
  to_port           = 0
  cidr_blocks       = ["0.0.0.0/0"]
  type              = "egress"
}

resource "aws_security_group_rule" "control_plane_egress" {
  from_port         = 0
  protocol          = "-1"
  security_group_id = aws_security_group.control_plane.id
  to_port           = 0
  cidr_blocks       = ["0.0.0.0/0"]
  type              = "egress"
}


resource "aws_security_group_rule" "allow_all_internal" {
  type                     = "ingress"
  from_port                = 0
  to_port                  = 0
  protocol                 = "-1"
  security_group_id        = aws_security_group.control_plane.id
  source_security_group_id = aws_security_group.worker.id
}

resource "aws_security_group_rule" "allow_all_internal_worker" {
  type                     = "ingress"
  from_port                = 0
  to_port                  = 0
  protocol                 = "-1"
  security_group_id        = aws_security_group.worker.id
  source_security_group_id = aws_security_group.control_plane.id
}


resource "aws_security_group_rule" "allow_http_ingress_worker" {
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  security_group_id = aws_security_group.worker.id
  cidr_blocks       = [var.vpc_cidr]
}

resource "aws_security_group_rule" "allow_https_ingress_worker" {
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  security_group_id = aws_security_group.worker.id
  cidr_blocks       = [var.vpc_cidr]
}

resource "aws_security_group_rule" "allow_all_ingress_worker_to_worker" {
  type                     = "ingress"
  from_port                = 0
  to_port                  = 0
  protocol                 = "-1"
  security_group_id        = aws_security_group.worker.id
  source_security_group_id = aws_security_group.worker.id
}
