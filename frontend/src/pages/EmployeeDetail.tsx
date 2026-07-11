import { useParams, Link } from "wouter";
import {
  useGetEmployee,
  useListTasks,
  useListTimeEntries,
  getGetEmployeeQueryKey,
  getListTasksQueryKey,
  getListTimeEntriesQueryKey
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
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Calendar, Briefcase, CheckSquare, Clock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const taskStatusMap: Record<string, string> = {
  backlog: "Backlog",
  todo: "Por Hacer",
  in_progress: "En Progreso",
  in_review: "En Revisión",
  done: "Completado",
};

export default function EmployeeDetail() {
  const { id } = useParams<{ id: string }>();
  const employeeId = parseInt(id || "0", 10);

  const { data: employee, isLoading: loadingEmployee } = useGetEmployee(employeeId, {
    query: { enabled: !!employeeId, queryKey: getGetEmployeeQueryKey(employeeId) }
  });

  const { data: tasksData, isLoading: loadingTasks } = useListTasks({ assigneeId: employeeId }, {
    query: { enabled: !!employeeId, queryKey: getListTasksQueryKey({ assigneeId: employeeId }) }
  });

  const { data: timeData, isLoading: loadingTime } = useListTimeEntries({ employeeId }, {
    query: { enabled: !!employeeId, queryKey: getListTimeEntriesQueryKey({ employeeId }) }
  });

  const tasks = tasksData?.data || [];
  const timeEntries = timeData?.data || [];

  if (loadingEmployee) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-[250px]" />
        <Card><CardContent className="h-[200px]" /></Card>
      </div>
    );
  }

  if (!employee) {
    return <div className="p-8 text-center text-muted-foreground">Empleado no encontrado.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/empleados">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{employee.firstName} {employee.lastName}</h2>
          <p className="text-muted-foreground">{employee.position || "Empleado"} • {employee.department || "Sin departamento"}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant={employee.status === "active" ? "default" : "secondary"} className="text-sm px-3 py-1">
            {employee.status === "active" ? "Activo" : "Inactivo"}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Perfil del Empleado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${employee.email}`} className="text-primary hover:underline">{employee.email}</a>
            </div>
            {employee.phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{employee.phone}</span>
              </div>
            )}
            {employee.department && (
              <div className="flex items-center gap-3 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{employee.department}</span>
              </div>
            )}
            {employee.hireDate && (
              <div className="flex items-center gap-3 text-sm pt-4 border-t">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Contratación:</span>
                <span className="font-medium">
                  {format(new Date(employee.hireDate), "dd MMM, yyyy", { locale: es })}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <Tabs defaultValue="tasks" className="w-full">
            <CardHeader className="pb-0">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="tasks">Tareas Asignadas</TabsTrigger>
                <TabsTrigger value="hours">Registro de Horas</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent className="pt-6">
              <TabsContent value="tasks" className="m-0">
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
                          <TableHead>Proyecto</TableHead>
                          <TableHead>Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tasks.map(task => (
                          <TableRow key={task.id}>
                            <TableCell className="font-medium">{task.title}</TableCell>
                            <TableCell>{task.projectName || "-"}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{taskStatusMap[task.status] || task.status}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground border rounded-md border-dashed">
                    <CheckSquare className="mx-auto h-8 w-8 mb-2 opacity-50" />
                    <p>No tiene tareas asignadas actualmente.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="hours" className="m-0">
                {loadingTime ? (
                  <div className="space-y-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : timeEntries.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Proyecto</TableHead>
                          <TableHead>Descripción</TableHead>
                          <TableHead className="text-right">Horas</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeEntries.map(entry => (
                          <TableRow key={entry.id}>
                            <TableCell className="whitespace-nowrap">
                              {format(new Date(entry.date), "dd MMM, yyyy", { locale: es })}
                            </TableCell>
                            <TableCell>{entry.projectName || "-"}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{entry.description || "-"}</TableCell>
                            <TableCell className="text-right font-semibold">{entry.hours}h</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground border rounded-md border-dashed">
                    <Clock className="mx-auto h-8 w-8 mb-2 opacity-50" />
                    <p>No hay registros de horas recientes.</p>
                  </div>
                )}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
