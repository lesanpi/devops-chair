.PHONY: fetch-kubeconfig tunnel

# 1. Autodescubrimiento dinámico: AWS CLI busca el ID del nodo maestro en tiempo real
MASTER_ID=$(shell aws ec2 describe-instances --filters "Name=tag:Role,Values=control-plane" "Name=instance-state-name,Values=running" --query "Reservations[0].Instances[0].InstanceId" --output text)
WORKER_ID=$(shell aws ec2 describe-instances --filters "Name=tag:Role,Values=worker" "Name=instance-state-name,Values=running" --query "Reservations[0].Instances[0].InstanceId" --output text)

fetch-kubeconfig:
	@echo "📦 Descargando kubeconfig desde el clúster usando nuestro túnel Ansible..."
	cd ansible && ansible role_control_plane -m fetch -a "src=/home/ubuntu/.kube/config dest=../kubeconfig_aws flat=yes" -b
	@echo "🔧 Re-escribiendo el endpoint a localhost (Zero-Trust)..."
	@perl -pi -e 's/server: https:\/\/[0-9.]*:6443/server: https:\/\/127.0.0.1:6443/g' kubeconfig_aws
	@perl -pi -e 's/certificate-authority-data: .*/insecure-skip-tls-verify: true/g' kubeconfig_aws
	@echo "✅ Listo. Para usarlo en esta terminal, ejecuta:"
	@echo "   export KUBECONFIG=$(PWD)/kubeconfig_aws"

tunnel:
	@if [ -z "$(MASTER_ID)" ]; then echo "❌ Error: No se encontró un nodo control-plane encendido."; exit 1; fi
	@echo "🚀 Abriendo túnel SSM encriptado hacia el Master ($(MASTER_ID)) en el puerto 6443..."
	@echo "⚠️  (Mantén esta terminal abierta. Presiona Ctrl+C para cerrar el túnel)"
	aws ssm start-session \
		--target $(MASTER_ID) \
		--document-name AWS-StartPortForwardingSession \
		--parameters '{"portNumber":["6443"], "localPortNumber":["6443"]}'

worker_tunnel:
	@if [ -z "$(WORKER_ID)" ]; then echo "❌ Error: No se encontró un nodo worker encendido."; exit 1; fi
	@echo "🚀 Abriendo túnel SSM encriptado hacia el Master ($(WORKER_ID)) en el puerto 443..."
	@echo "⚠️  (Mantén esta terminal abierta. Presiona Ctrl+C para cerrar el túnel)"
	aws ssm start-session \
		--target ${WORKER_ID} \
		--document-name AWS-StartPortForwardingSession \
		--parameters '{"portNumber":["443"], "localPortNumber":["443"]}'