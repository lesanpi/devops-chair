import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/portfolio/landing";

export const Route = createFileRoute("/")({ component: Landing });
