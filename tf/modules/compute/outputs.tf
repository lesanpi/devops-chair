output "instance_ids" {
  value       = aws_instance.node[*].id
  description = "IDs of the instances created"
}

output "private_ips" {
  value       = aws_instance.node[*].private_ip
  description = "Private IPs of the nodes (for the cluster join)"
}
