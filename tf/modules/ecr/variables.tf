variable "repository_name" {
  description = "The name of the ECR repository"
  type        = string
}

variable "tags" {
  description = "The tags to apply to the ECR repository"
  type        = map(string)
  default     = {}
}

variable "force_delete" {
  description = "Whether to force delete the ECR repository"
  type        = bool
  default     = true
}

variable "image_tag_mutability" {
  description = "The image tag mutability of the ECR repository"
  type        = string
  default     = "MUTABLE"
}

variable "scan_on_push" {
  description = "Whether to scan the image on push"
  type        = bool
  default     = true
}

variable "max_image_count" {
  description = "The maximum number of images to keep in the ECR repository"
  type        = number
  default     = 10
}
