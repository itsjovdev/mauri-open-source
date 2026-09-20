import { Badge } from "@/components/ui/badge";

interface ActiveStatusBadgeProps {
  active: boolean;
}

export function ActiveStatusBadge({ active }: ActiveStatusBadgeProps) {
  return (
    <Badge variant={active ? "success" : "secondary"}>
      {active ? "Activo" : "Inactivo"}
    </Badge>
  );
}
