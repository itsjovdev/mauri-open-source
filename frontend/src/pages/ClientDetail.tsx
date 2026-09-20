import { useParams, Link } from "wouter";
import {
  useGetClient,
  useGetClientProjects,
  useGetClientInvoices,
  getGetClientQueryKey,
  getGetClientProjectsQueryKey,
  getGetClientInvoicesQueryKey
} from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { DetailPageHeader } from "@/components/detail-page-header";
import { EmptyState } from "@/components/empty-state";
import { CopyableText } from "@/components/copyable-text";
import { Building, Mail, Phone, MapPin, Briefcase, FileText } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/format";

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const clientId = parseInt(id || "0", 10);

  const { data: client, isLoading: loadingClient } = useGetClient(clientId, {
    query: { enabled: !!clientId, queryKey: getGetClientQueryKey(clientId) }
  });

  const { data: projects, isLoading: loadingProjects } = useGetClientProjects(clientId, {
    query: { enabled: !!clientId, queryKey: getGetClientProjectsQueryKey(clientId) }
  });

  const { data: invoices, isLoading: loadingInvoices } = useGetClientInvoices(clientId, {
    query: { enabled: !!clientId, queryKey: getGetClientInvoicesQueryKey(clientId) }
  });

  if (loadingClient) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-[200px]" />
        <Card>
          <CardHeader><Skeleton className="h-6 w-[150px]" /></CardHeader>
          <CardContent><Skeleton className="h-[200px] w-full" /></CardContent>
        </Card>
      </div>
    );
  }

  if (!client) {
    return <div className="p-8 text-center text-muted-foreground">Cliente no encontrado.</div>;
  }

  return (
    <div className="space-y-6">
      <DetailPageHeader
        backHref="/clientes"
        title={client.name}
        subtitle="Detalles del cliente e historial"
        actions={
          <Badge variant={client.status === "active" ? "default" : "secondary"} className="text-sm px-3 py-1">
            {client.status === "active" ? "Activo" : "Inactivo"}
          </Badge>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {client.company && (
              <div className="flex items-center gap-3 text-sm">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{client.company}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <CopyableText value={client.email}>
                <a href={`mailto:${client.email}`} className="text-primary hover:underline">{client.email}</a>
              </CopyableText>
            </div>
            {client.phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <CopyableText value={client.phone} />
              </div>
            )}
            {(client.address || client.city || client.country) && (
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span>
                  {client.address && <>{client.address}<br/></>}
                  {[client.city, client.country].filter(Boolean).join(", ")}
                </span>
              </div>
            )}
            {client.taxId && (
              <div className="flex items-center gap-3 text-sm pt-2 border-t mt-4">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">NIF/CIF:</span>
                <span className="font-medium">{client.taxId}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <Tabs defaultValue="projects" className="w-full">
            <CardHeader className="pb-0">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="projects">Proyectos</TabsTrigger>
                <TabsTrigger value="invoices">Facturas</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="projects" className="m-0">
                {loadingProjects ? (
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : projects && projects.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Progreso</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects.map(project => (
                          <TableRow key={project.id}>
                            <TableCell className="font-medium">
                              <Link href={`/proyectos/${project.id}`} className="hover:underline text-primary">
                                {project.name}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{project.status}</Badge>
                            </TableCell>
                            <TableCell>{project.progress}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <EmptyState icon={Briefcase} message="No hay proyectos asociados a este cliente." />
                )}
              </TabsContent>
              <TabsContent value="invoices" className="m-0">
                {loadingInvoices ? (
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : invoices && invoices.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Número</TableHead>
                          <TableHead>Fecha Vto.</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.map(invoice => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">
                              <Link href={`/facturas/${invoice.id}`} className="hover:underline text-primary">
                                {invoice.invoiceNumber}
                              </Link>
                            </TableCell>
                            <TableCell>
                              {invoice.dueDate ? formatDate(invoice.dueDate) : "-"}
                            </TableCell>
                            <TableCell>{formatCurrency(invoice.total)}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{invoice.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <EmptyState icon={FileText} message="No hay facturas asociadas a este cliente." />
                )}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
