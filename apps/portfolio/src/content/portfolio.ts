export type Lang = "en" | "es";

export type Project = {
  title: string;
  where: string;
  year: string;
  summary: string;
  points: string[];
  stack: string[];
  image: string;
  alt: string;
  href?: string;
};

export type Role = {
  title: string;
  org: string;
  when: string;
  place: string;
  points: string[];
  image?: string;
  alt?: string;
  href?: string;
};

type Copy = {
  metaTitle: string;
  nav: { work: string; projects: string; skills: string; contact: string };
  kicker: string;
  name: string;
  role: string;
  lede: string;
  location: string;
  prompt: string;
  ctaWork: string;
  ctaContact: string;
  live: string[];
  workTitle: string;
  workLead: string;
  roles: Role[];
  projectsTitle: string;
  projectsLead: string;
  projects: Project[];
  skillsTitle: string;
  skillsLead: string;
  groups: { name: string; items: string[] }[];
  studyTitle: string;
  verify: string;
  certs: { name: string; href: string }[];
  schools: { name: string; detail: string }[];
  contactTitle: string;
  contactLead: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
};

export const copy: Record<Lang, Copy> = {
  en: {
    metaTitle: "Luis Enrique Sánchez — Platform",
    nav: { work: "Work", projects: "Projects", skills: "Stack", contact: "Contact" },
    kicker: "platform · devops · tech lead · product",
    name: "Luis Enrique Sánchez P.",
    role: "Tech Lead, and a Cloud and DevOps engineer who also ships the product.",
    lede: "I design platforms on AWS, GCP, and Azure: isolated environments, the pipeline that deploys them, and the path when a region or a cloud fails. Services in Python, Node.js, and Java. Flutter when the product needs a phone.",
    location: "Caracas · remote",
    prompt: "whoami",
    ctaWork: "See the work",
    ctaContact: "Write",
    live: [
      "Tech Lead and cloud solutions architect: AWS, GCP, and Azure",
      "Infrastructure as code, multi-cloud and multi-region",
      "Server configuration management with Ansible",
      "CI/CD with OIDC: the pipeline assumes a role, no long-lived keys",
      "Kubernetes with Argo CD on EKS, this cluster, OpenShift, and OKD",
    ],
    workTitle: "Where the practice comes from",
    workLead: "Four years of platform and product, then a fintech platform on AWS with a failover path to GCP.",
    roles: [
      {
        title: "Cloud Engineer",
        org: "Clockout Financial",
        when: "Apr 2026 – Oct 2026",
        place: "Remote, United States",
        image: "/projects/clockout.jpg",
        alt: "Clockout homepage",
        href: "https://joinclockout.com/",
        points: [
          "Infrastructure as code with Terraform for the whole platform on AWS and GCP. Multi-cloud and multi-region, with an isolated environment per financial institution.",
          "CI/CD for that infrastructure with OIDC. The pipeline exchanges a short-lived token for a cloud role, then plans and applies. No long-lived keys in the repository.",
          "Solution architecture on AWS: ALB, ECS, Lambda, and AWS WAF in front of a B2B Early Wage Access platform.",
          "Ingestion with Kinesis Data Streams and Firehose into a lake queried with Athena. APIs on API Gateway.",
          "Cross-region disaster recovery on AWS and failover to GCP, with DMS keeping databases in sync. On GCP: Cloud Run, Artifact Registry, Cloud Build, and Cloud Deploy.",
        ],
      },
      {
        title: "Full Stack Developer · Tech Lead · DevOps Engineer",
        org: "Avila Tek",
        when: "Apr 2022 – Apr 2026",
        place: "Caracas",
        image: "/projects/avilatek.jpg",
        alt: "Avila Tek homepage",
        href: "https://avilatek.com/",
        points: [
          "I joined as a Full Stack Developer, was promoted to Tech Lead, and then specialized in Cloud and DevOps. The role was transversal: I sat with every team and every project, suggested the improvements, implemented the solution, and installed a DevOps culture.",
          "As Tech Lead I set the technical direction and stayed on the product: APIs, services, and the release. DevOps was not a side task. It was most of the last stretch, on the same systems.",
          "On AWS I ran EKS and ECS, GitOps with Argo CD, and CI/CD on CodePipeline, CodeBuild, Jenkins, and GitHub Actions. Terraform and Ansible held the infrastructure. Several systems moved to a cloud-native shape, in private subnets, behind a NAT.",
          "Internal VPN for the company. One monitoring view for every service and every team, with alerts for security events and unusual traffic.",
          "Prometheus, Grafana, Loki, Tempo, and OpenTelemetry. Cloudflare and AWS WAF on the edge. Stress tests with k6, and image and dependency scans in the pipeline.",
        ],
      },
      {
        title: "Junior Software Developer",
        org: "Dynatuners",
        when: "Aug 2021 – Nov 2021",
        place: "Remote, Texas",
        points: [
          "Custom ERP modules on Dynamics 365 with C#.",
          "Process automation and reporting with Power Automate and Power BI.",
        ],
      },
    ],
    projectsTitle: "Projects",
    projectsLead: "A personal lab, an Early Wage Access platform, and the systems I operated at Avila Tek.",
    projects: [
      {
        title: "devops-chair",
        where: "Personal lab",
        year: "2026",
        summary:
          "My personal DevOps lab. I run the stack I would use at work: Kubernetes, Docker, a container registry, Argo CD, AWS, EC2, and GitHub Actions. This is where I try things.",
        points: [
          "The cluster is private EC2, built with Terraform and Ansible, and kept in Git with Argo CD.",
          "Registry, ingress, and pipelines live here, so the next change is a push, not a click in a console.",
        ],
        stack: ["AWS", "EC2", "Kubernetes", "Docker", "Argo CD", "Terraform", "Ansible", "GitHub Actions"],
        image: "/projects/cluster.jpg",
        alt: "Dark racks with a few green status lights",
      },
      {
        title: "Early Wage Access",
        where: "Clockout Financial",
        year: "2026",
        summary:
          "B2B Early Wage Access for U.S. financial institutions: salary drawn before payday. Each institution gets its own environment, its own edge, and a rehearsed way out.",
        points: [
          "Terraform for the whole platform on AWS and GCP. CI/CD with OIDC applies it. Ansible holds the servers.",
          "Ingestion with Kinesis into a lake on Athena. Disaster recovery across AWS regions, and failover to GCP with DMS.",
        ],
        stack: ["AWS", "GCP", "Terraform", "Ansible", "CI/CD", "ECS", "DMS", "Disaster Recovery", "AWS WAF"],
        image: "/projects/clockout.jpg",
        alt: "Clockout homepage",
        href: "https://joinclockout.com/",
      },
      {
        title: "Mercantil Seguros",
        where: "Avila Tek",
        year: "2022–2026",
        summary: "The insurance platform on AWS. I ran the Kubernetes cluster, the GitOps path, and the edge in front of it.",
        points: [
          "Microservices on EKS, images in ECR, GitOps with Argo CD. CI/CD on CodePipeline and CodeBuild.",
          "GuardDuty, IAM, RDS, and CloudWatch. I found the bottlenecks and stress-tested with k6.",
          "AWS WAF and Cloudflare on the edge, including the static sites. Docker and Kubernetes are the center of this one.",
        ],
        stack: ["EKS", "Kubernetes", "Docker", "Argo CD", "ECR", "CodePipeline", "CodeBuild", "GuardDuty", "RDS", "CloudWatch", "k6", "AWS WAF", "Cloudflare"],
        image: "/projects/mercantil.jpg",
        alt: "Mercantil Seguros homepage",
        href: "https://www.mercantilseguros.com/",
      },
      {
        title: "Estei",
        where: "Avila Tek",
        year: "2022–2026",
        summary: "A stays marketplace in Venezuela. I owned the monitoring and the defense when the traffic turned hostile.",
        points: [
          "Grafana dashboards, Loki for logs, Prometheus, and OpenTelemetry. SLO and SLA on that board, with alarms on the services.",
          "Blue team: I read the logs, stopped DDoS, and held the firewall.",
          "Cloudflare for bot checks, bot attacks, firewall rules, and rate limits. DevSecOps scans on dependencies and images.",
        ],
        stack: ["Grafana", "Loki", "Prometheus", "OpenTelemetry", "SLO/SLA", "Cloudflare", "DevSecOps"],
        image: "/projects/estei.jpg",
        alt: "Estei stay search",
        href: "https://estei.app/",
      },
      {
        title: "Seguros Continental",
        where: "Avila Tek",
        year: "2022–2026",
        summary: "The AWS footprint as code. I designed the solution and the network underneath it.",
        points: [
          "Terraform for the infrastructure. ECS on Fargate, ALB, ECR, RDS, and Lambda, set up for high availability.",
          "VPC, subnets, and NAT. AWS WAF with rules and rate limits.",
          "Dashboards and alarms on Grafana, Prometheus, and Grafana Alloy.",
        ],
        stack: ["Terraform", "ECS", "Fargate", "ALB", "ECR", "RDS", "Lambda", "VPC", "NAT", "AWS WAF", "Grafana", "Prometheus"],
        image: "/projects/continental.jpg",
        alt: "Seguros Continental homepage",
        href: "https://continentaldeseguros.com.ve/",
      },
      {
        title: "Kaizen",
        where: "Avila Tek",
        year: "2022–2026",
        summary: "I moved the system to a cloud-native shape and left the tasks in private subnets.",
        points: [
          "ECS Fargate behind an ALB and AWS WAF. NAT so the services reach the internet without a public address.",
          "CI/CD on CodePipeline and CodeBuild, images in ECR, Trivy on images and dependencies.",
          "Grafana, Prometheus, Loki, and OpenTelemetry. Alarms for unusual traffic and DDoS, plus rate limits on the edge.",
        ],
        stack: ["ECS", "Fargate", "ALB", "AWS WAF", "NAT", "CodePipeline", "CodeBuild", "ECR", "Trivy", "Grafana", "Prometheus", "Loki", "OpenTelemetry"],
        image: "/projects/cloud.jpg",
        alt: "Distant dark halls linked by thin green lines",
      },
      {
        title: "Widú Legal",
        where: "Avila Tek",
        year: "2022–2026",
        summary: "Service health and traces for the legal product. The app lives at app.widulegal.com.",
        points: [
          "Prometheus, Grafana, and Tempo for metrics and traces. Grafana Alloy collects them.",
          "I found the bottlenecks and fixed them. The services run on Docker.",
        ],
        stack: ["Prometheus", "Grafana", "Tempo", "Grafana Alloy", "Docker"],
        image: "/projects/widu.jpg",
        alt: "Widú Legal homepage",
        href: "https://widulegal.com/",
      },
      {
        title: "Armi",
        where: "Avila Tek",
        year: "2022–2026",
        summary: "The signal for the consumer app. Dashboards, hostile traffic, and the hot path that Redis took off the services.",
        points: [
          "Grafana and Prometheus for the service view, including unusual traffic and DDoS.",
          "I found the bottlenecks and put Redis on the hot path.",
        ],
        stack: ["Grafana", "Prometheus", "Redis"],
        image: "/projects/armi.jpg",
        alt: "Armi homepage",
        href: "https://tuarmi.com/",
      },
      {
        title: "Internal secrets platform",
        where: "Avila Tek",
        year: "2022–2026",
        summary: "A secrets platform for engineering teams, so credentials stopped living in chat. GitHub OAuth, a Node.js service, a Python service, an SDK, and a CLI.",
        points: [
          "People sign in with the GitHub account they already have.",
          "The SDK and the CLI are how a secret leaves the platform and reaches a pipeline.",
        ],
        stack: ["GitHub OAuth", "Node.js", "Python", "CI/CD"],
        image: "/projects/vault.jpg",
        alt: "A steel latch with a thin green reflection",
      },
    ],
    skillsTitle: "Stack",
    skillsLead: "What I operate. Not a percentage.",
    groups: [
      {
        name: "AWS",
        items: ["ECS", "EKS", "Lambda", "API Gateway", "Kinesis", "Athena", "DMS", "VPC", "ALB", "WAF", "CloudFront"],
      },
      {
        name: "GCP and Azure",
        items: ["Cloud Run", "Cloud Build", "Cloud Deploy", "Artifact Registry", "Cloud SQL", "Azure"],
      },
      {
        name: "Platform",
        items: ["Terraform", "Terragrunt", "Ansible", "Kubernetes", "Nomad", "Docker", "Argo CD"],
      },
      {
        name: "Delivery and signal",
        items: ["GitHub Actions", "Jenkins", "Cloudflare", "OpenTelemetry", "Prometheus", "Grafana", "Loki", "k6", "Trivy"],
      },
      {
        name: "Product",
        items: ["Python", "FastAPI", "Node.js", "Spring Boot", "Flutter", "PostgreSQL", "MongoDB", "GraphQL"],
      },
    ],
    studyTitle: "Study",
    verify: "Verify",
    certs: [
      {
        name: "AWS Certified Solutions Architect – Associate",
        href: "https://www.credly.com/badges/c17052c7-cddd-4b2c-b846-e05f55f6f6c5/public_url",
      },
      {
        name: "AWS Certified Cloud Practitioner",
        href: "https://www.credly.com/badges/7efa3ff1-0d85-418a-83a3-d07100a822b2/public_url",
      },
    ],
    schools: [
      { name: "Master's in Information Systems", detail: "UCAB · 2023 – present" },
      { name: "Telecommunications Engineering", detail: "UCAB · 2017 – 2023" },
      { name: "English", detail: "Universidad Simón Bolívar · 2013 – 2016" },
    ],
    contactTitle: "Contact",
    contactLead: "Caracas. Remote. The mailbox is open.",
    email: "lespinerua@gmail.com",
    phone: "+58 414 913 7341",
    github: "github.com/lesanpi",
    linkedin: "linkedin.com/in/lesanpi",
  },
  es: {
    metaTitle: "Luis Enrique Sánchez — Plataforma",
    nav: { work: "Trabajo", projects: "Proyectos", skills: "Stack", contact: "Contacto" },
    kicker: "plataforma · devops · líder técnico · producto",
    name: "Luis Enrique Sánchez P.",
    role: "Líder técnico e ingeniero de cloud y DevOps que también entrega el producto.",
    lede: "Diseño plataformas en AWS, GCP y Azure: ambientes aislados, el pipeline que los despliega, y el camino cuando falla una región o una nube. Servicios en Python, Node.js y Java. Flutter cuando el producto necesita un teléfono.",
    location: "Caracas · remoto",
    prompt: "whoami",
    ctaWork: "Ver el trabajo",
    ctaContact: "Escribir",
    live: [
      "Líder técnico y arquitecto de soluciones en la nube: AWS, GCP y Azure",
      "Infraestructura como código, multi-cloud y multi-región",
      "Configuration management de servidores con Ansible",
      "CI/CD con OIDC: el pipeline asume un rol, sin llaves de larga vida",
      "Kubernetes con Argo CD en EKS, este cluster, OpenShift y OKD",
    ],
    workTitle: "De dónde sale la práctica",
    workLead: "Cuatro años de plataforma y producto, y después una plataforma fintech en AWS con failover a GCP.",
    roles: [
      {
        title: "Cloud Engineer",
        org: "Clockout Financial",
        when: "abr 2026 – oct 2026",
        place: "Remoto, Estados Unidos",
        image: "/projects/clockout.jpg",
        alt: "Inicio de Clockout",
        href: "https://joinclockout.com/",
        points: [
          "Infraestructura como código con Terraform para toda la plataforma en AWS y GCP. Arquitectura multi-cloud y multi-región, con un ambiente aislado por institución financiera.",
          "Pipelines de CI/CD con OIDC para desplegar esa infraestructura. El pipeline cambia un token de corta vida por un rol en la nube, y ahí corre plan y apply. Sin llaves de larga vida en el repositorio.",
          "Arquitectura de soluciones en AWS: ALB, ECS, Lambda y AWS WAF para una plataforma B2B de Early Wage Access, el adelanto de salario.",
          "Ingesta con Kinesis Data Streams y Firehose a un lago consultado con Athena. APIs en API Gateway.",
          "Disaster recovery entre regiones en AWS y failover a GCP, con DMS manteniendo las bases al día. En GCP: Cloud Run, Artifact Registry, Cloud Build y Cloud Deploy.",
        ],
      },
      {
        title: "Full Stack Developer · Tech Lead · DevOps Engineer",
        org: "Avila Tek",
        when: "abr 2022 – abr 2026",
        place: "Caracas",
        image: "/projects/avilatek.jpg",
        alt: "Inicio de Avila Tek",
        href: "https://avilatek.com/",
        points: [
          "Entré como desarrollador Full Stack, ascendí a Tech Lead y después me especialicé en Cloud y DevOps. El rol fue transversal en la compañía: participé en todos los equipos y proyectos, sugerí mejoras, implementé las soluciones e instalé la cultura DevOps.",
          "Como Tech Lead marqué la dirección técnica y seguí en el producto: APIs, servicios y la salida a producción. DevOps no fue un extra. Fue gran parte del tramo final, sobre los mismos sistemas.",
          "En AWS operé EKS y ECS, GitOps con Argo CD, y CI/CD en CodePipeline, CodeBuild, Jenkins y GitHub Actions. Terraform y Ansible sostenían la infraestructura. Varios sistemas pasaron a una forma cloud-native, en subnets privadas, detrás de un NAT.",
          "VPN interna de la compañía. Un tablero de monitoreo para cada servicio y cada equipo, con alertas de seguridad y de tráfico inusual.",
          "Prometheus, Grafana, Loki, Tempo y OpenTelemetry. Cloudflare y AWS WAF en el borde. Pruebas de estrés con k6, y escaneo de imágenes y dependencias en el pipeline.",
        ],
      },
      {
        title: "Junior Software Developer",
        org: "Dynatuners",
        when: "ago 2021 – nov 2021",
        place: "Remoto, Texas",
        points: [
          "Módulos de ERP a medida en Dynamics 365 con C#.",
          "Automatización y reportes con Power Automate y Power BI.",
        ],
      },
    ],
    projectsTitle: "Proyectos",
    projectsLead: "Un laboratorio personal, Early Wage Access, y los sistemas que operé en Avila Tek.",
    projects: [
      {
        title: "devops-chair",
        where: "Laboratorio personal",
        year: "2026",
        summary:
          "Mi laboratorio personal de DevOps. Ahí corre el stack que usaría en el trabajo: Kubernetes, Docker, un registry, Argo CD, AWS, EC2 y GitHub Actions. Es donde pruebo las cosas.",
        points: [
          "El cluster está en EC2 privado, armado con Terraform y Ansible, y se mantiene desde Git con Argo CD.",
          "El registry, el ingress y los pipelines viven ahí. El siguiente cambio es un push, no un clic en una consola.",
        ],
        stack: ["AWS", "EC2", "Kubernetes", "Docker", "Argo CD", "Terraform", "Ansible", "GitHub Actions"],
        image: "/projects/cluster.jpg",
        alt: "Racks oscuros con pocas luces verdes",
      },
      {
        title: "Early Wage Access",
        where: "Clockout Financial",
        year: "2026",
        summary:
          "Early Wage Access B2B para instituciones financieras de EE. UU.: el adelanto de salario. Cada institución tiene su ambiente, su borde y una salida ensayada.",
        points: [
          "Terraform para toda la plataforma en AWS y GCP. El CI/CD con OIDC la aplica. Ansible sostiene los servidores.",
          "Ingesta con Kinesis a un lago en Athena. Disaster recovery entre regiones de AWS, y failover a GCP con DMS.",
        ],
        stack: ["AWS", "GCP", "Terraform", "Ansible", "CI/CD", "ECS", "DMS", "Disaster Recovery", "AWS WAF"],
        image: "/projects/clockout.jpg",
        alt: "Inicio de Clockout",
        href: "https://joinclockout.com/",
      },
      {
        title: "Mercantil Seguros",
        where: "Avila Tek",
        year: "2022–2026",
        summary: "La plataforma de seguros en AWS. Operé el cluster de Kubernetes, el camino de GitOps y el borde.",
        points: [
          "Microservicios en EKS, imágenes en ECR, GitOps con Argo CD. CI/CD en CodePipeline y CodeBuild.",
          "GuardDuty, IAM, RDS y CloudWatch. Encontré los cuellos de botella y corrí pruebas de estrés con k6.",
          "AWS WAF y Cloudflare en el borde, incluidos los sitios estáticos. Docker y Kubernetes son el centro de este trabajo.",
        ],
        stack: ["EKS", "Kubernetes", "Docker", "Argo CD", "ECR", "CodePipeline", "CodeBuild", "GuardDuty", "RDS", "CloudWatch", "k6", "AWS WAF", "Cloudflare"],
        image: "/projects/mercantil.jpg",
        alt: "Inicio de Mercantil Seguros",
        href: "https://www.mercantilseguros.com/",
      },
      {
        title: "Estei",
        where: "Avila Tek",
        year: "2022–2026",
        summary: "Hospedaje en Venezuela. Me encargué del monitoreo y de la defensa cuando el tráfico se volvió hostil.",
        points: [
          "Dashboards en Grafana, logs en Loki, Prometheus y OpenTelemetry. SLO y SLA en ese tablero, con alarmas sobre los servicios.",
          "Blue team: leí los logs, detuve DDoS y sostuve el firewall.",
          "Cloudflare para bot checks, ataques de bots, reglas de firewall y rate limits. DevSecOps: escaneo de dependencias y de imágenes.",
        ],
        stack: ["Grafana", "Loki", "Prometheus", "OpenTelemetry", "SLO/SLA", "Cloudflare", "DevSecOps"],
        image: "/projects/estei.jpg",
        alt: "Búsqueda de hospedaje en Estei",
        href: "https://estei.app/",
      },
      {
        title: "Seguros Continental",
        where: "Avila Tek",
        year: "2022–2026",
        summary: "Toda la huella de AWS como código. Diseñé la solución y la red que la sostiene.",
        points: [
          "Terraform para la infraestructura. ECS en Fargate, ALB, ECR, RDS y Lambda, con alta disponibilidad.",
          "VPC, subnets y NAT. AWS WAF con reglas y rate limits.",
          "Dashboards y alarmas en Grafana, Prometheus y Grafana Alloy.",
        ],
        stack: ["Terraform", "ECS", "Fargate", "ALB", "ECR", "RDS", "Lambda", "VPC", "NAT", "AWS WAF", "Grafana", "Prometheus"],
        image: "/projects/continental.jpg",
        alt: "Inicio de Seguros Continental",
        href: "https://continentaldeseguros.com.ve/",
      },
      {
        title: "Kaizen",
        where: "Avila Tek",
        year: "2022–2026",
        summary: "Pasé el sistema a una forma cloud-native y dejé los servicios en subnets privadas.",
        points: [
          "ECS Fargate detrás de un ALB y AWS WAF. NAT para que salgan a internet sin una dirección pública.",
          "CI/CD en CodePipeline y CodeBuild, imágenes en ECR, Trivy sobre imágenes y dependencias.",
          "Grafana, Prometheus, Loki y OpenTelemetry. Alarmas de tráfico inusual y DDoS, y rate limits en el borde.",
        ],
        stack: ["ECS", "Fargate", "ALB", "AWS WAF", "NAT", "CodePipeline", "CodeBuild", "ECR", "Trivy", "Grafana", "Prometheus", "Loki", "OpenTelemetry"],
        image: "/projects/cloud.jpg",
        alt: "Salas oscuras unidas por líneas verdes",
      },
      {
        title: "Widú Legal",
        where: "Avila Tek",
        year: "2022–2026",
        summary: "Salud de los servicios y trazas del producto legal. La app está en app.widulegal.com.",
        points: [
          "Prometheus, Grafana y Tempo para métricas y trazas. Grafana Alloy las recoge.",
          "Encontré los cuellos de botella y los corregí. Los servicios corren en Docker.",
        ],
        stack: ["Prometheus", "Grafana", "Tempo", "Grafana Alloy", "Docker"],
        image: "/projects/widu.jpg",
        alt: "Inicio de Widú Legal",
        href: "https://widulegal.com/",
      },
      {
        title: "Armi",
        where: "Avila Tek",
        year: "2022–2026",
        summary: "La observabilidad de la app. Dashboards, tráfico hostil, y Redis para quitarle presión a los servicios.",
        points: [
          "Grafana y Prometheus para ver los servicios, incluido el tráfico inusual y los DDoS.",
          "Encontré los cuellos de botella y metí Redis para aliviar los servicios.",
        ],
        stack: ["Grafana", "Prometheus", "Redis"],
        image: "/projects/armi.jpg",
        alt: "Inicio de Armi",
        href: "https://tuarmi.com/",
      },
      {
        title: "Plataforma de secretos",
        where: "Avila Tek",
        year: "2022–2026",
        summary: "Una plataforma de secretos para equipos de ingeniería, para que las credenciales dejaran de vivir en el chat. GitHub OAuth, un servicio en Node.js, uno en Python, un SDK y un CLI.",
        points: [
          "La gente entra con la cuenta de GitHub que ya tiene.",
          "El SDK y el CLI son la forma en que un secreto sale de la plataforma y llega a un pipeline.",
        ],
        stack: ["GitHub OAuth", "Node.js", "Python", "CI/CD"],
        image: "/projects/vault.jpg",
        alt: "Un pestillo de acero con un reflejo verde",
      },
    ],
    skillsTitle: "Stack",
    skillsLead: "Lo que opero. No es un porcentaje.",
    groups: [
      {
        name: "AWS",
        items: ["ECS", "EKS", "Lambda", "API Gateway", "Kinesis", "Athena", "DMS", "VPC", "ALB", "WAF", "CloudFront"],
      },
      {
        name: "GCP y Azure",
        items: ["Cloud Run", "Cloud Build", "Cloud Deploy", "Artifact Registry", "Cloud SQL", "Azure"],
      },
      {
        name: "Plataforma",
        items: ["Terraform", "Terragrunt", "Ansible", "Kubernetes", "Nomad", "Docker", "Argo CD"],
      },
      {
        name: "Entrega y señal",
        items: ["GitHub Actions", "Jenkins", "Cloudflare", "OpenTelemetry", "Prometheus", "Grafana", "Loki", "k6", "Trivy"],
      },
      {
        name: "Producto",
        items: ["Python", "FastAPI", "Node.js", "Spring Boot", "Flutter", "PostgreSQL", "MongoDB", "GraphQL"],
      },
    ],
    studyTitle: "Estudio",
    verify: "Verificar",
    certs: [
      {
        name: "AWS Certified Solutions Architect – Associate",
        href: "https://www.credly.com/badges/c17052c7-cddd-4b2c-b846-e05f55f6f6c5/public_url",
      },
      {
        name: "AWS Certified Cloud Practitioner",
        href: "https://www.credly.com/badges/7efa3ff1-0d85-418a-83a3-d07100a822b2/public_url",
      },
    ],
    schools: [
      { name: "Maestría en Sistemas de Información", detail: "UCAB · 2023 – presente" },
      { name: "Ingeniería en Telecomunicaciones", detail: "UCAB · 2017 – 2023" },
      { name: "Inglés", detail: "Universidad Simón Bolívar · 2013 – 2016" },
    ],
    contactTitle: "Contacto",
    contactLead: "Caracas. Remoto. El correo está abierto.",
    email: "lespinerua@gmail.com",
    phone: "+58 414 913 7341",
    github: "github.com/lesanpi",
    linkedin: "linkedin.com/in/lesanpi",
  },
};
