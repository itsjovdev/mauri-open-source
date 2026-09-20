import { useMemo, useState } from "react";
import { useParams, Link } from "wouter";
import { ArrowLeft, Download } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuoteForm } from "./useQuoteForm";
import { QuoteLineItems } from "./QuoteLineItems";
import { formatCurrency, TAX_RATE } from "./quote-totals";
import { companyProfile } from "./company-profile";
import { QUOTE_THEMES, getTheme, DEFAULT_THEME_ID } from "./quote-themes";


export default function QuoteEditor() {
  const { id } = useParams<{ id?: string }>();
  const quoteId = id ? parseInt(id, 10) : undefined;
  const q = useQuoteForm(quoteId);
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID);
  const [showDiscount, setShowDiscount] = useState(false);
  const theme = getTheme(themeId);

  const selectedClient = useMemo(
    () => q.clients.find((c) => String(c.id) === q.form.clientId),
    [q.clients, q.form.clientId],
  );

  const issueDate = q.createdAt ? new Date(q.createdAt) : new Date();
  const pdfName = `presupuesto-${q.quoteNumber ?? "borrador"}`;

  if (q.loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-[250px]" />
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <Card><CardContent className="h-[560px]" /></Card>
          <Card><CardContent className="h-[320px]" /></Card>
        </div>
      </div>
    );
  }

  if (q.notFound) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Presupuesto no encontrado.
      </div>
    );
  }

  const billToLines = selectedClient
    ? [
        selectedClient.company && selectedClient.company !== selectedClient.name
          ? selectedClient.company
          : null,
        selectedClient.email,
        [selectedClient.address, selectedClient.city].filter(Boolean).join(", ") || null,
        selectedClient.taxId ? `NIF: ${selectedClient.taxId}` : null,
      ].filter(Boolean)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href={q.isEdit ? `/presupuestos/${quoteId}` : "/presupuestos"}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold tracking-tight">
          {q.isEdit ? `Editar ${q.quoteNumber ?? "presupuesto"}` : "Nuevo Presupuesto"}
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">

        <Card className="overflow-hidden">
          <div className="h-1.5 w-full" style={{ backgroundColor: theme.accent }} />
          <CardContent className="space-y-8 p-8">

            <div className="flex items-start justify-between gap-6">
              <div className="flex h-24 w-32 items-center justify-center rounded-lg border border-dashed">
                {companyProfile.logoUrl ? (
                  <img
                    src={companyProfile.logoUrl}
                    alt={companyProfile.name}
                    className="h-12 w-12 object-contain"
                  />
                ) : (
                  <span className="text-xs text-muted-foreground">Logo</span>
                )}
              </div>

              <div className="text-right">
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: theme.accent }}
                >
                  Nº Presupuesto
                </p>
                <p className="text-2xl font-bold tracking-tight">
                  {q.quoteNumber ?? "Se asigna al guardar"}
                </p>
                <div className="mt-3 flex items-start justify-end gap-8 text-sm">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Fecha emisión
                    </p>
                    <p className="h-5 leading-5">{format(issueDate, "dd/MM/yyyy", { locale: es })}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Válido hasta
                    </p>
                    <Input
                      type="date"
                      className="h-5 w-[140px] border-0 p-0 text-right leading-5 shadow-none focus-visible:ring-1 focus-visible:ring-ring/40"
                      value={q.form.validUntil}
                      onChange={(e) => q.setField("validUntil", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>


            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  De
                </p>
                <p className="font-semibold">{companyProfile.name}</p>
                {companyProfile.lines.map((line) => (
                  <p key={line} className="text-sm text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>

              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Para <span className="text-destructive">*</span>
                </p>
                <Select value={q.form.clientId} onValueChange={(v) => q.setField("clientId", v)}>
                  <SelectTrigger className="mb-1">
                    <SelectValue placeholder="Seleccionar cliente…" />
                  </SelectTrigger>
                  <SelectContent>
                    {q.clients.map((c) => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.name}
                        {c.company && c.company !== c.name ? ` — ${c.company}` : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {billToLines.map((line) => (
                  <p key={line} className="text-sm text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>
            </div>


            <div className="space-y-1.5">
              <Label htmlFor="title" className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Título / Asunto
              </Label>
              <Input
                id="title"
                placeholder="Ej: Desarrollo web fase 1"
                value={q.form.title}
                onChange={(e) => q.setField("title", e.target.value)}
              />
            </div>


            <QuoteLineItems
              items={q.form.items}
              onUpdate={q.updateItem}
              onAdd={q.addItem}
              onRemove={q.removeItem}
              showDiscount={showDiscount}
              accent={theme.accent}
            />


            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="notes" className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  Notas / Condiciones
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Condiciones, observaciones…"
                  rows={4}
                  value={q.form.notes}
                  onChange={(e) => q.setField("notes", e.target.value)}
                />
              </div>

              <div className="flex flex-col justify-end">
                <div className="space-y-2 text-sm">
                  <div
                    className="flex justify-between border-b pb-2 text-muted-foreground"
                    style={{ borderColor: `${theme.accent}55` }}
                  >
                    <span>Base imponible</span>
                    <span className="tabular-nums">{formatCurrency(q.totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>IVA ({Math.round(TAX_RATE * 100)}%)</span>
                    <span className="tabular-nums">{formatCurrency(q.totals.totalTax)}</span>
                  </div>
                  <div className="flex justify-between pt-2 text-lg font-bold">
                    <span>Total</span>
                    <span className="tabular-nums" style={{ color: theme.accent }}>
                      {formatCurrency(q.totals.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card className="lg:sticky lg:top-6">
          <CardContent className="space-y-6 p-6">
            <h3 className="text-sm font-semibold">Ajustes del Presupuesto</h3>

            <div className="space-y-2">
              <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Tema de color
              </Label>
              <div className="flex gap-2">
                {QUOTE_THEMES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setThemeId(t.id)}
                    aria-label={t.label}
                    className="h-9 w-9 rounded-full ring-offset-2 transition-all"
                    style={{
                      backgroundColor: t.accent,
                      boxShadow: t.id === themeId ? `0 0 0 2px ${t.accent}` : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Moneda
              </Label>
              <div className="flex h-9 items-center rounded-md border bg-muted/40 px-3 text-sm text-muted-foreground">
                EUR — Euro (€)
              </div>
            </div>

            <Separator />

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox
                checked={showDiscount}
                onCheckedChange={(v) => setShowDiscount(v === true)}
              />
              Mostrar columna de descuento
            </label>

            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Proyecto (opcional)
              </Label>
              <Select
                value={q.form.projectId || "none"}
                onValueChange={(v) => q.setField("projectId", v === "none" ? "" : v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Ninguno" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Ninguno</SelectItem>
                  {q.projects.map((p) => (
                    <SelectItem key={p.id} value={String(p.id)}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Nombre del PDF
              </Label>
              <div className="flex items-center gap-1">
                <Input value={pdfName} readOnly className="bg-muted/40 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">.pdf</span>
              </div>
              <Button variant="outline" className="w-full" disabled title="Disponible en la Fase 3">
                <Download className="mr-2 h-4 w-4" /> Descargar PDF
              </Button>
            </div>

            <Separator />

            {q.error && <p className="text-sm text-destructive">{q.error}</p>}

            <div className="space-y-2">
              <Button
                className="w-full text-white hover:opacity-90"
                style={{ backgroundColor: theme.accent }}
                onClick={q.save}
                disabled={q.isSaving}
              >
                {q.isSaving
                  ? "Guardando…"
                  : q.isEdit
                    ? "Guardar cambios"
                    : "Crear Presupuesto"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={q.cancel}
                disabled={q.isSaving}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
