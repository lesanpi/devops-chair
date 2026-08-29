variable "prefix_name" {
  description = "The prefix name for the resources"
  type        = string
}

variable "vpc_id" {
  description = "The ID of the VPC"
  type        = string
}

variable "subnet_id" {
  description = "The ID of the subnet"
  type        = string
}

variable "instance_type" {
  description = "The type of the instance"
  type        = string
  default     = "t4g.nano"
}

variable "private_route_table_id" {
  description = "The ID of the private route table to use for the NAT instance"
  type        = string
}

variable "iam_instance_profile_name" {
  description = "The name of the IAM instance profile"
  type        = string
}

variable "private_subnets_id" {
  description = "Private subnets ids"
  type        = list(string)
}
