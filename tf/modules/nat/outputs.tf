output "nat_instance_id" {
  value = aws_instance.nat.id
}

output "nat_eip_id" {
  value = aws_eip.nat.id
}

output "private_nat_route_id" {
  value = aws_route.private_nat_route.id
}
