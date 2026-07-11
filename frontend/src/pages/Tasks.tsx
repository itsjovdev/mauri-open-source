import { useState } from "react";
import { Link } from "wouter";
import { useListTasks } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Calendar, Clock, UserCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const COLUMNS = [
  { id: "backlog", title: "Backlog" },
  { id: "todo", title: "Por Hacer" },
  { id: "in_progress", title: "En Progreso" },
  { id: "in_review", title: "En Revisión" },
  { id: "done", title: "Completado" },
];

export default function Tasks() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useListTasks({ search });

  const tasks = data?.data || [];

  return (
    <div className="space-y-6 h-[calc(100vh-10rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tareas</h2>
          <p className="text-muted-foreground">Tablero Kanban para la gestión de tareas.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nueva Tarea
        </Button>
      </div>

      <div className="flex items-center justify-between flex-shrink-0">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tareas..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
          {COLUMNS.map((col) => (
            <div key={col.id} className="bg-muted/50 rounded-lg p-4 space-y-4">
              <h3 className="font-semibold">{col.title}</h3>
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4 flex-1">
          {COLUMNS.map((column) => {
            const columnTasks = tasks.filter((t) => t.status === column.id);
            return (
              <div key={column.id} className="bg-muted/30 border rounded-lg p-4 min-w-[280px] w-[280px] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{column.title}</h3>
                  <Badge variant="secondary" className="rounded-full w-6 h-6 p-0 flex items-center justify-center">
                    {columnTasks.length}
                  </Badge>
                </div>
                <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                  {columnTasks.map((task) => (
                    <Card key={task.id} className="cursor-pointer hover:border-primary/50 transition-colors">
                      <CardHeader className="p-3 pb-2">
                        <CardTitle className="text-sm font-medium leading-tight">
                          {task.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-3 pt-0 text-xs text-muted-foreground">
                        <div className="mb-2 line-clamp-2">{task.description}</div>
                        {task.projectName && (
                          <div className="mb-2 text-primary font-medium">{task.projectName}</div>
                        )}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t">
                          {task.dueDate ? (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(task.dueDate), "d MMM", { locale: es })}
                            </span>
                          ) : (
                            <span />
                          )}
                          {task.assigneeName && (
                            <span className="flex items-center gap-1 truncate max-w-[100px]">
                              <UserCircle className="h-3 w-3" />
                              <span className="truncate">{task.assigneeName}</span>
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {columnTasks.length === 0 && (
                    <div className="text-center p-4 text-sm text-muted-foreground border-2 border-dashed rounded-md">
                      Sin tareas
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
