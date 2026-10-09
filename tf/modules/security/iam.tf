data "aws_iam_policy_document" "ssm_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

# SSM Role

resource "aws_iam_role" "ssm_role" {
  name               = "${var.prefix_name}-ssm-role"
  assume_role_policy = data.aws_iam_policy_document.ssm_policy.json
}

resource "aws_iam_role_policy_attachment" "ssm_policy" {
  role       = aws_iam_role.ssm_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "ssm_profile" {
  name = "${var.prefix_name}-ssm-profile"
  role = aws_iam_role.ssm_role.name
}


resource "aws_iam_role_policy" "ssm_s3_policy" {
  name = "ssm-ansible-transfers"
  role = aws_iam_role.ssm_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          "arn:aws:s3:::devops-chair-ssm-transfers",
          "arn:aws:s3:::devops-chair-ssm-transfers/*"
        ]
      }
    ]
  })
}


# Worker Role

resource "aws_iam_role" "worker_role" {
  name               = "${var.prefix_name}-worker-role"
  assume_role_policy = data.aws_iam_policy_document.ssm_policy.json

}


# Worker Policy

# S3 Registry Get
resource "aws_iam_role_policy" "worker_s3_registry_get" {
  name = "worker-s3-registry-get"
  role = aws_iam_role.worker_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:ListBucket"
        ]
        Resource = [
          "arn:aws:s3:::${var.registry_bucket_name}",
          "arn:aws:s3:::${var.registry_bucket_name}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy" "worker_pull_ecr_get" {
  name = "worker-ecr-get"
  role = aws_iam_role.worker_role.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        "Sid" : "EcrAuth",
        "Effect" : "Allow",
        "Action" : "ecr:GetAuthorizationToken",
        "Resource" : "*"
      },
      {
        "Sid" : "EcrDevopsChair",
        "Effect" : "Allow",
        "Action" : [
          "ecr:BatchCheckLayerAvailability",
          "ecr:BatchGetImage",
          "ecr:CompleteLayerUpload",
          "ecr:DescribeImages",
          "ecr:DescribeRepositories",
          "ecr:GetDownloadUrlForLayer",
          "ecr:InitiateLayerUpload",
          "ecr:ListImages",
          "ecr:PutImage",
          "ecr:UploadLayerPart"
        ],
        "Resource" : "arn:aws:ecr:us-east-1:275061641109:devops-chair/*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "worker_policy" {
  role       = aws_iam_role.worker_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy"
}

resource "aws_iam_role_policy_attachment" "worker_ssm" {
  role       = aws_iam_role.worker_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}


resource "aws_iam_instance_profile" "worker_profile" {
  name = "${var.prefix_name}-worker-profile"
  role = aws_iam_role.worker_role.name
}
