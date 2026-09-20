import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  message: string;
}

export function EmptyState({ icon: Icon, message }: EmptyStateProps) {
  return (
    <div className="text-center py-8 text-muted-foreground border rounded-md border-dashed">
      {Icon && <Icon className="mx-auto h-8 w-8 mb-2 opacity-50" />}
      <p>{message}</p>
    </div>
  );
}
