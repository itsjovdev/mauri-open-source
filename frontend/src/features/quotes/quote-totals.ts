import type { QuoteItem } from "@/api";




export const TAX_RATE = 0.21;

export type LineItem = QuoteItem;

export const emptyItem = (): LineItem => ({
  description: "",
  quantity: 1,
  unitPrice: 0,
  discount: 0,
  tax: 0,
  total: 0,
});

const round2 = (n: number) => parseFloat(n.toFixed(2));


export function computeItem(item: LineItem): LineItem {
  const base = item.quantity * item.unitPrice - (item.discount ?? 0);
  const tax = round2(base * TAX_RATE);
  const total = round2(base + tax);
  return { ...item, tax, total };
}

export interface QuoteTotals {
  subtotal: number;
  totalTax: number;
  total: number;
}


export function computeTotals(items: LineItem[]): QuoteTotals {
  const subtotal = items.reduce(
    (s, i) => s + i.quantity * i.unitPrice - (i.discount ?? 0),
    0,
  );
  const totalTax = items.reduce((s, i) => s + (i.tax ?? 0), 0);
  const total = items.reduce((s, i) => s + i.total, 0);
  return { subtotal: round2(subtotal), totalTax: round2(totalTax), total: round2(total) };
}


export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);
