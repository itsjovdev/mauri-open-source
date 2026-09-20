import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface DetailPageHeaderProps {
  backHref: string;
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
}

export function DetailPageHeader({ backHref, title, subtitle, actions }: DetailPageHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" asChild>
        <Link href={backHref}>
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </Button>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {subtitle && <div className="text-muted-foreground">{subtitle}</div>}
      </div>
      {actions && <div className="ml-auto flex items-center gap-3">{actions}</div>}
    </div>
  );
}
