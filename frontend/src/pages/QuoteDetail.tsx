import { useParams, Link } from "wouter";
import {
  useGetQuote,
  useConvertQuoteToInvoice,
  getGetQuoteQueryKey
} from "@/api";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DetailPageHeader } from "@/components/detail-page-header";
import { FileText, Building } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/format";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  draft: { label: "Borrador", variant: "secondary" },
  sent: { label: "Enviado", variant: "outline" },
  approved: { label: "Aprobado", variant: "default" },
  rejected: { label: "Rechazado", variant: "destructive" },
  expired: { label: "Expirado", variant: "secondary" },
};

export default function QuoteDetail() {
  const { id } = useParams<{ id: string }>();
  const quoteId = parseInt(id || "0", 10);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: quote, isLoading: loadingQuote } = useGetQuote(quoteId, {
    query: { enabled: !!quoteId, queryKey: getGetQuoteQueryKey(quoteId) }
  });

  const convertMutation = useConvertQuoteToInvoice();

  const handleConvertToInvoice = () => {
    convertMutation.mutate({ id: quoteId }, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Presupuesto convertido",
          description: "El presupuesto ha sido convertido a factura exitosamente.",
        });
        queryClient.invalidateQueries({ queryKey: getGetQuoteQueryKey(quoteId) });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "No se pudo convertir el presupuesto.",
          variant: "destructive",
        });
      }
    });
  };

  if (loadingQuote) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-[250px]" />
        <Card><CardContent className="h-[400px]" /></Card>
      </div>
    );
  }

  if (!quote) {
    return <div className="p-8 text-center text-muted-foreground">Presupuesto no encontrado.</div>;
  }

  return (
    <div className="space-y-6">
      <DetailPageHeader
        backHref="/presupuestos"
        title={`Presupuesto ${quote.quoteNumber}`}
        subtitle={quote.title || "Sin título"}
        actions={
          <>
            <Badge variant={statusMap[quote.status]?.variant || "default"} className="text-sm px-3 py-1">
              {statusMap[quote.status]?.label || quote.status}
            </Badge>
            {quote.status === "approved" && (
              <Button
                onClick={handleConvertToInvoice}
                disabled={convertMutation.isPending}
              >
                <FileText className="mr-2 h-4 w-4" />
                Convertir a Factura
              </Button>
            )}
          </>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Detalle de Líneas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Cantidad</TableHead>
                    <TableHead className="text-right">Precio Unit.</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quote.items && quote.items.length > 0 ? (
                    quote.items.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{item.description}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                        <TableCell className="text-right font-semibold">{formatCurrency(item.total)}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                        No hay líneas en este presupuesto.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-end gap-2 bg-muted/20 border-t py-6">
            <div className="flex justify-between w-full md:w-1/2 text-sm">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>{formatCurrency(quote.subtotal)}</span>
            </div>
            {(quote.discount ?? 0) > 0 && (
              <div className="flex justify-between w-full md:w-1/2 text-sm text-destructive">
                <span>Descuento:</span>
                <span>-{formatCurrency(quote.discount || 0)}</span>
              </div>
            )}
            <div className="flex justify-between w-full md:w-1/2 text-sm">
              <span className="text-muted-foreground">Impuestos ({(quote.tax ?? 0) > 0 ? "IVA" : "0%"}):</span>
              <span>{formatCurrency(quote.tax || 0)}</span>
            </div>
            <div className="flex justify-between w-full md:w-1/2 text-lg font-bold pt-2 border-t mt-2">
              <span>Total:</span>
              <span>{formatCurrency(quote.total)}</span>
            </div>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{quote.clientName || "Cliente Desconocido"}</div>
                  <Link href={`/clientes/${quote.clientId}`} className="text-sm text-primary hover:underline">
                    Ver perfil
                  </Link>
                </div>
              </div>
              <div className="text-sm pt-4 border-t space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fecha emisión:</span>
                  <span className="font-medium">{formatDate(quote.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Válido hasta:</span>
                  <span className="font-medium">
                    {quote.validUntil ? formatDate(quote.validUntil) : "-"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {quote.notes || "Sin notas adicionales."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
