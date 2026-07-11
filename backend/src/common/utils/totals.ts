export interface LineItem {
  quantity: number;
  unitPrice: number;
  discount?: number;
  tax?: number;
}

export interface DocumentTotals {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}


export function computeTotals(items: LineItem[]): DocumentTotals {
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
  const discount = items.reduce((sum, i) => sum + (i.discount || 0), 0);
  const tax = items.reduce((sum, i) => sum + (i.tax || 0), 0);
  return { subtotal, discount, tax, total: subtotal - discount + tax };
}
