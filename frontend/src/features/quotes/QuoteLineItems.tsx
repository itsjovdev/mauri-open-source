import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatCurrency, type LineItem } from "./quote-totals";

interface Props {
  items: LineItem[];
  onUpdate: (index: number, field: keyof LineItem, value: string | number) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  showDiscount: boolean;
  accent: string;
}

const cellInput =
  "h-8 border-0 bg-transparent px-1 shadow-none focus-visible:ring-1 focus-visible:ring-ring/40";


export function QuoteLineItems({
  items,
  onUpdate,
  onAdd,
  onRemove,
  showDiscount,
  accent,
}: Props) {
  const cols = showDiscount
    ? "grid grid-cols-[24px_1fr_60px_96px_88px_104px_28px] gap-2"
    : "grid grid-cols-[24px_1fr_60px_96px_104px_28px] gap-2";

  return (
    <div className="space-y-1">
      <div
        className={`${cols} items-center border-b pb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground`}
        style={{ borderColor: `${accent}55` }}
      >
        <span>#</span>
        <span>Concepto</span>
        <span className="text-center">Cant.</span>
        <span className="text-right">Precio</span>
        {showDiscount && <span className="text-right">Dto. €</span>}
        <span className="text-right">Total</span>
        <span />
      </div>

      {items.map((item, idx) => (
        <div key={idx} className={`${cols} items-center border-b border-border/50 py-1`}>
          <span className="text-sm text-muted-foreground">{idx + 1}</span>
          <Input
            placeholder="Descripción del concepto"
            className={cellInput}
            value={item.description}
            onChange={(e) => onUpdate(idx, "description", e.target.value)}
          />
          <Input
            type="number"
            min={1}
            className={`${cellInput} text-center`}
            value={item.quantity}
            onChange={(e) => onUpdate(idx, "quantity", parseFloat(e.target.value) || 1)}
          />
          <Input
            type="number"
            min={0}
            step={0.01}
            className={`${cellInput} text-right`}
            value={item.unitPrice}
            onChange={(e) => onUpdate(idx, "unitPrice", parseFloat(e.target.value) || 0)}
          />
          {showDiscount && (
            <Input
              type="number"
              min={0}
              step={0.01}
              className={`${cellInput} text-right`}
              value={item.discount ?? 0}
              onChange={(e) => onUpdate(idx, "discount", parseFloat(e.target.value) || 0)}
            />
          )}
          <span className="pr-1 text-right text-sm font-medium tabular-nums">
            {formatCurrency(item.total)}
          </span>
          <button
            type="button"
            onClick={() => onRemove(idx)}
            disabled={items.length === 1}
            className="flex h-7 w-7 items-center justify-center rounded text-muted-foreground transition-colors hover:text-destructive disabled:opacity-30"
            aria-label="Eliminar línea"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
        style={{ color: accent }}
      >
        <Plus className="h-4 w-4" /> Añadir línea
      </button>
    </div>
  );
}
