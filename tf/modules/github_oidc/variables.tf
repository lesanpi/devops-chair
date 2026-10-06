variable "prefix_name" {
  description = "Prefix for IAM role names"
  type        = string
}

variable "subject_claims" {
  description = "GitHub OIDC sub claims allowed to assume the role. Use repo:org/name:* for this repository only."
  type        = list(string)
}

variable "policy_arns" {
  description = "Managed policies attached to the GitHub Actions role"
  type        = list(string)
  default     = []
}
