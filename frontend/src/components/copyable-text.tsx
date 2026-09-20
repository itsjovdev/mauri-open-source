import { useState, type ReactNode, type MouseEvent } from "react";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CopyableTextProps {
  value: string;
  children?: ReactNode;
}

export function CopyableText({ value, children }: CopyableTextProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  async function handleCopy(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast({ description: "Copiado al portapapeles." });
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast({ description: "No se pudo copiar.", variant: "destructive" });
    }
  }

  return (
    <span className="group/copy inline-flex items-center gap-1.5">
      <span>{children ?? value}</span>
      <button
        type="button"
        onClick={handleCopy}
        className="text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover/copy:opacity-100"
        aria-label="Copiar"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </span>
  );
}
