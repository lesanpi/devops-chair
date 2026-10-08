variable "bucket_name" {
  type        = string
  description = "The name of the S3 bucket"
}

variable "region" {
  type        = string
  description = "The region of the S3 bucket"
}

variable "tags" {
  type        = map(string)
  description = "The tags of the S3 bucket"
}
