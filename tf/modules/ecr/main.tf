resource "aws_ecr_repository" "ecr_repository" {
  name                 = var.repository_name
  tags                 = var.tags
  force_delete         = var.force_delete
  image_tag_mutability = var.image_tag_mutability
  image_scanning_configuration {
    scan_on_push = var.scan_on_push
  }
}

resource "aws_ecr_lifecycle_policy" "ecr_lifecycle_policy" {
  repository = aws_ecr_repository.ecr_repository.name
  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep only the last images"
        selection = {
          tagStatus   = "any"
          countType   = "imageCountMoreThan"
          countNumber = var.max_image_count
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}
