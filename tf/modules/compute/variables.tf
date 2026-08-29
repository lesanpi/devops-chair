

variable "cluster_name" {
  description = "The name of the cluster"
  type        = string
}

variable "vpc_id" {
  description = "The ID of the VPC"
  type        = string
}

variable "node_role" {
  description = "The role of the node"
  type        = string
}

variable "instance_type" {
  description = "The type of the instance"
  type        = string
}

variable "instance_count" {
  description = "The number of instances to create"
  type        = number
  default     = 1
}
variable "subnet_id" {
  description = "The ID of the subnet"
  type        = string
}

variable "security_group_id" {
  description = "The ID of the security group"
  type        = string
}

variable "iam_instance_profile_name" {
  description = "The name of the IAM instance profile"
  type        = string
}

variable "extra_tags" {
  type        = map(string)
  description = "Mapa de etiquetas adicionales (Obligatorio incluir la llave 'Role' para Ansible)"
  default     = {}
}
