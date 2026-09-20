import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, getAvatarColor } from "@/lib/avatar-colors";
import { cn } from "@/lib/utils";

interface EntityAvatarProps {
  name: string;
  className?: string;
}

export function EntityAvatar({ name, className }: EntityAvatarProps) {
  const color = getAvatarColor(name);
  return (
    <Avatar className={cn("h-8 w-8", className)}>
      <AvatarFallback className={cn("text-xs font-semibold", color.bg, color.text)}>
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
