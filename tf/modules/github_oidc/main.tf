data "tls_certificate" "github" {
  url = "https://token.actions.githubusercontent.com/.well-known/openid-configuration"
}

resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [data.tls_certificate.github.certificates[0].sha1_fingerprint]
}

locals {
  # Classic: repo:owner/name:*
  # Immutable (GitHub default for repos created after 2026-07-15):
  #   repo:owner@OWNER_ID/name@REPO_ID:ref:...
  # Wildcard the repo id so we do not have to hardcode private-repo ids.
  oidc_sub_claims = distinct(flatten([
    for repo in var.allowed_repositories : [
      "repo:${repo}:*",
      "repo:${split("/", repo)[0]}@${var.github_owner_id}/${split("/", repo)[1]}@*",
    ]
  ]))
}

data "aws_iam_policy_document" "github_assume" {
  statement {
    sid     = "GitHubActionsOidc"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = local.oidc_sub_claims
    }
  }
}

resource "aws_iam_role" "github" {
  name               = "${var.prefix_name}-github-actions"
  assume_role_policy = data.aws_iam_policy_document.github_assume.json
}

resource "aws_iam_role_policy_attachment" "github" {
  for_each = toset(var.policy_arns)

  role       = aws_iam_role.github.name
  policy_arn = each.value
}
