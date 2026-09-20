import { useParams, Link } from "wouter";
import {
  useGetProject,
  useListTasks,
  getGetProjectQueryKey,
  getListTasksQueryKey
} from "@/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Progress } from "@/components/ui/progress";
import { DetailPageHeader } from "@/components/detail-page-header";
import { EmptyState } from "@/components/empty-state";
import { Calendar, DollarSign, Target, AlignLeft } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/format";
import { taskStatusMap } from "@/lib/status-maps";

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  planning: { label: "Planificación", variant: "outline" },
  active: { label: "Activo", variant: "default" },
  on_hold: { label: "En espera", variant: "secondary" },
  completed: { label: "Completado", variant: "default" },
  cancelled: { label: "Cancelado", variant: "destructive" },
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || "0", 10);

  const { data: project, isLoading: loadingProject } = useGetProject(projectId, {
    query: { enabled: !!projectId, queryKey: getGetProjectQueryKey(projectId) }
  });

  const { data: tasksData, isLoading: loadingTasks } = useListTasks({ projectId }, {
    query: { enabled: !!projectId, queryKey: getListTasksQueryKey({ projectId }) }
  });

  const tasks = tasksData?.data || [];

  if (loadingProject) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-[250px]" />
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-[200px] w-full col-span-2" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    );
  }

  if (!project) {
    return <div className="p-8 text-center text-muted-foreground">Proyecto no encontrado.</div>;
  }

  return (
    <div className="space-y-6">
      <DetailPageHeader
        backHref="/proyectos"
        title={project.name}
        subtitle={
          <div className="flex items-center gap-2 mt-1">
            <span>Proyecto</span>
            {project.clientName && (
              <>
                <span>&bull;</span>
                <Link href={`/clientes/${project.clientId}`} className="text-primary hover:underline font-medium">
                  {project.clientName}
                </Link>
              </>
            )}
          </div>
        }
        actions={
          <Badge variant={statusMap[project.status]?.variant || "default"} className="text-sm px-3 py-1">
            {statusMap[project.status]?.label || project.status}
          </Badge>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Descripción General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-3 text-sm">
              <AlignLeft className="h-5 w-5 text-muted-foreground shrink-0" />
              <p className="leading-relaxed">
                {project.description || <span className="text-muted-foreground italic">Sin descripción proporcionada.</span>}
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <div className="flex items-center justify-between text-sm font-medium">
                <span>Progreso ({project.progress}%)</span>
              </div>
              <Progress value={project.progress} className="h-2.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Detalles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Target className="h-4 w-4" /> Prioridad
              </span>
              <span className="font-medium capitalize">{project.priority}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" /> Fecha de inicio
              </span>
              <span className="font-medium">
                {project.startDate ? formatDate(project.startDate) : "-"}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" /> Fecha límite
              </span>
              <span className="font-medium">
                {project.deadline ? formatDate(project.deadline) : "-"}
              </span>
            </div>
            {project.budget !== null && project.budget !== undefined && (
              <div className="flex items-center justify-between text-sm pt-4 border-t">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" /> Presupuesto
                </span>
                <span className="font-semibold text-lg">{formatCurrency(project.budget)}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Tareas del Proyecto</CardTitle>
            <CardDescription>Lista de tareas asignadas a este proyecto</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/tareas?projectId=${project.id}`}>Ver en tablero</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {loadingTasks ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : tasks.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Asignado A</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Prioridad</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map(task => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{task.assigneeName || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{taskStatusMap[task.status] || task.status}</Badge>
                      </TableCell>
                      <TableCell className="capitalize">{task.priority}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <EmptyState message="No hay tareas registradas para este proyecto." />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
