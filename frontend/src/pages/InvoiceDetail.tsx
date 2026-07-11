import { useParams, Link } from "wouter";
import {
  useGetInvoice,
  getGetInvoiceQueryKey
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
import { ArrowLeft, Download, CreditCard, Building } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  draft: { label: "Borrador", variant: "secondary" },
  sent: { label: "Enviada", variant: "outline" },
  pending: { label: "Pendiente", variant: "outline" },
  paid: { label: "Pagada", variant: "default" },
  partial: { label: "Parcial", variant: "secondary" },
  cancelled: { label: "Cancelada", variant: "destructive" },
};

export default function InvoiceDetail() {
  const { id } = useParams<{ id: string }>();
  const invoiceId = parseInt(id || "0", 10);

  const { data: invoice, isLoading: loadingInvoice } = useGetInvoice(invoiceId, {
    query: { enabled: !!invoiceId, queryKey: getGetInvoiceQueryKey(invoiceId) }
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(val);
  };

  if (loadingInvoice) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-[250px]" />
        <Card><CardContent className="h-[400px]" /></Card>
      </div>
    );
  }

  if (!invoice) {
    return <div className="p-8 text-center text-muted-foreground">Factura no encontrada.</div>;
  }

  const isPaid = invoice.status === "paid";
  const balanceDue = invoice.total - (invoice.paidAmount || 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/facturas">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Factura {invoice.invoiceNumber}</h2>
          <p className="text-muted-foreground">{invoice.title || "Sin título"}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Badge variant={statusMap[invoice.status]?.variant || "default"} className="text-sm px-3 py-1">
            {statusMap[invoice.status]?.label || invoice.status}
          </Badge>
          {!isPaid && invoice.status !== "cancelled" && (
            <Button>
              <CreditCard className="mr-2 h-4 w-4" />
              Registrar Pago
            </Button>
          )}
        </div>
      </div>

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
                  {invoice.items && invoice.items.length > 0 ? (
                    invoice.items.map((item, idx) => (
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
                        No hay líneas en esta factura.
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
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            {(invoice.discount ?? 0) > 0 && (
              <div className="flex justify-between w-full md:w-1/2 text-sm text-destructive">
                <span>Descuento:</span>
                <span>-{formatCurrency(invoice.discount || 0)}</span>
              </div>
            )}
            <div className="flex justify-between w-full md:w-1/2 text-sm">
              <span className="text-muted-foreground">Impuestos:</span>
              <span>{formatCurrency(invoice.tax || 0)}</span>
            </div>
            <div className="flex justify-between w-full md:w-1/2 text-lg font-bold pt-2 border-t mt-2">
              <span>Total a Pagar:</span>
              <span>{formatCurrency(invoice.total)}</span>
            </div>
            <div className="flex justify-between w-full md:w-1/2 text-sm pt-2">
              <span className="text-muted-foreground">Monto Pagado:</span>
              <span className="text-green-600 font-medium">{formatCurrency(invoice.paidAmount || 0)}</span>
            </div>
            {!isPaid && (
              <div className="flex justify-between w-full md:w-1/2 text-md font-bold pt-2 border-t mt-2 text-destructive">
                <span>Saldo Pendiente:</span>
                <span>{formatCurrency(balanceDue)}</span>
              </div>
            )}
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Facturación a</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{invoice.clientName || "Cliente Desconocido"}</div>
                  <Link href={`/clientes/${invoice.clientId}`} className="text-sm text-primary hover:underline">
                    Ver perfil
                  </Link>
                </div>
              </div>
              <div className="text-sm pt-4 border-t space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fecha emisión:</span>
                  <span className="font-medium">{format(new Date(invoice.createdAt), "dd MMM, yyyy", { locale: es })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vencimiento:</span>
                  <span className="font-medium">
                    {invoice.dueDate ? format(new Date(invoice.dueDate), "dd MMM, yyyy", { locale: es }) : "-"}
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
                {invoice.notes || "No hay notas adicionales en esta factura."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
