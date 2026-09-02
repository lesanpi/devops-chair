output "ssm_instance_profile_name" {
  value = aws_iam_instance_profile.ssm_profile.name
}

output "control_plane_sg_id" {
  value = aws_security_group.control_plane.id
}

output "worker_sg_id" {
  value = aws_security_group.worker.id
}

output "worker_instance_profile_role" {
  value = aws_iam_instance_profile.worker_profile.name
}
