import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONE_STYLES = {
  primary: "bg-primary/10 text-primary",
  success: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  danger: "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400",
  info: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
} as const;

interface StatCardProps {
  title: string;
  value: ReactNode;
  icon: LucideIcon;
  description?: ReactNode;
  loading?: boolean;
  valueClassName?: string;
  tone?: keyof typeof TONE_STYLES;
  trend?: { value: number };
}

export function StatCard({ title, value, icon: Icon, description, loading, valueClassName, tone = "primary", trend }: StatCardProps) {
  const isPositive = (trend?.value ?? 0) >= 0;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {loading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <div className={valueClassName ?? "text-2xl font-bold"}>{value}</div>
            )}
          </div>
          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", TONE_STYLES[tone])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {!loading && (trend || description) && (
          <div className="mt-2 flex items-center gap-2">
            {trend && (
              <span className={cn(
                "flex items-center gap-0.5 text-xs font-medium",
                isPositive ? "text-emerald-600" : "text-rose-600"
              )}>
                {isPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                {Math.abs(trend.value)}%
              </span>
            )}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
