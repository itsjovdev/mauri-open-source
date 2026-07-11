
export interface QuoteTheme {
  id: string;
  label: string;
  accent: string;
}

export const QUOTE_THEMES: QuoteTheme[] = [
  { id: "mint", label: "Menta", accent: "#4ade80" },
  { id: "green", label: "Verde", accent: "#16a34a" },
  { id: "rose", label: "Rojo", accent: "#f43f5e" },
  { id: "amber", label: "Ámbar", accent: "#f59e0b" },
  { id: "slate", label: "Oscuro", accent: "#1e293b" },
];

export const DEFAULT_THEME_ID = "rose";

export const getTheme = (id: string): QuoteTheme =>
  QUOTE_THEMES.find((t) => t.id === id) ?? QUOTE_THEMES[2];
