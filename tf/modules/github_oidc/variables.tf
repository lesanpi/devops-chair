variable "prefix_name" {
  description = "Prefix for IAM role names"
  type        = string
}

variable "allowed_repositories" {
  description = "GitHub repositories allowed to assume the role, as owner/name."
  type        = list(string)
}

variable "github_owner_id" {
  description = "Numeric GitHub user/org id for immutable OIDC subject claims (repos created after 2026-07-15)."
  type        = string
}

variable "policy_arns" {
  description = "Managed policies attached to the GitHub Actions role"
  type        = list(string)
  default     = []
}
