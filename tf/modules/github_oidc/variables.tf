variable "prefix_name" {
  description = "Prefix for IAM role names"
  type        = string
}

variable "allowed_repositories" {
  description = "GitHub repositories allowed to assume the role, as owner/name. Matches the OIDC repository claim."
  type        = list(string)
}

variable "subject_claims" {
  description = "Optional extra GitHub OIDC sub patterns (repo:owner/name:*). Empty uses repository claim only."
  type        = list(string)
  default     = []
}

variable "policy_arns" {
  description = "Managed policies attached to the GitHub Actions role"
  type        = list(string)
  default     = []
}
