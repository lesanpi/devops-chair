output "control_plane_ip" {
  value       = module.control_plane.private_ips[0]
  description = "Master Node Private IP"
}

output "worker_ips" {
  value       = module.workers.private_ips
  description = "Private IPs of the Workers node"
}
