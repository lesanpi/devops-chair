variable "vpc_id" {
  description = "The ID of the VPC"
  type        = string
}

variable "prefix_name" {
  description = "The prefix name for the resources"
  type        = string
  default     = "my"
}


variable "vpc_cidr" {
  description = "The CIDR block for the VPC"
  type        = string
}
