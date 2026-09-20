import { format } from "date-fns";
import { es } from "date-fns/locale";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);
}

export function formatDate(value: string | Date, pattern = "dd MMM, yyyy"): string {
  return format(new Date(value), pattern, { locale: es });
}
