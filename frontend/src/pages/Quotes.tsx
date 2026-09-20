import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useListQuotes, useDeleteQuote, useConvertQuoteToInvoice, getListQuotesQueryKey } from "@/api";
import { useConfirmDelete } from "@/hooks/use-confirm-delete";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { EntityAvatar } from "@/components/entity-avatar";
import { PaginationBar } from "@/components/pagination-bar";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/format";

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" }> = {
  draft: { label: "Borrador", variant: "secondary" },
  sent: { label: "Enviado", variant: "outline" },
  approved: { label: "Aprobado", variant: "success" },
  rejected: { label: "Rechazado", variant: "destructive" },
  expired: { label: "Expirado", variant: "secondary" },
};

const PAGE_SIZE = 10;

export default function Quotes() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [, setLocation] = useLocation();
  const { data, isLoading } = useListQuotes({ search, page, limit: PAGE_SIZE });
  const deleteQuote = useDeleteQuote();
  const convertMutation = useConvertQuoteToInvoice();
  const { toast } = useToast();
  const confirmDelete = useConfirmDelete(deleteQuote, getListQuotesQueryKey({ search, page, limit: PAGE_SIZE }), "Presupuesto");

  const quotes = data?.data || [];

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleConvert(quoteId: number) {
    convertMutation.mutate({ id: quoteId }, {
      onSuccess: () => {
        toast({ variant: "success", title: "Presupuesto convertido", description: "Se generó la factura correctamente." });
      },
      onError: () => {
        toast({ variant: "destructive", title: "Error", description: "No se pudo convertir el presupuesto." });
      },
    });
  }

  return (
    <>
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Presupuestos</h2>
          <p className="text-muted-foreground">Emite y realiza seguimiento de presupuestos comerciales.</p>
        </div>
        <Button onClick={() => setLocation("/presupuestos/nuevo")}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Presupuesto
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar presupuestos..."
            className="pl-8"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-[120px]" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-[80px]" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : quotes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No se encontraron presupuestos.
                </TableCell>
              </TableRow>
            ) : (
              quotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="font-medium">
                    <Link href={`/presupuestos/${quote.id}`} className="hover:underline text-primary">
                      {quote.quoteNumber}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {quote.clientName ? (
                      <div className="flex items-center gap-3">
                        <EntityAvatar name={quote.clientName} />
                        {quote.clientName}
                      </div>
                    ) : "-"}
                  </TableCell>
                  <TableCell>{quote.title || "-"}</TableCell>
                  <TableCell className="font-semibold">{formatCurrency(quote.total)}</TableCell>
                  <TableCell>
                    <Badge variant={statusMap[quote.status]?.variant || "secondary"}>
                      {statusMap[quote.status]?.label || quote.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/presupuestos/${quote.id}`}>Ver detalles</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={quote.status !== "approved" || convertMutation.isPending}
                          onClick={() => handleConvert(quote.id)}
                        >
                          Convertir a Factura
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/presupuestos/${quote.id}/editar`}>Editar</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => confirmDelete(quote.id, quote.quoteNumber)}
                        >
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {data && (
        <PaginationBar page={page} limit={PAGE_SIZE} total={data.total} onPageChange={setPage} />
      )}
    </div>
    </>
  );
}
