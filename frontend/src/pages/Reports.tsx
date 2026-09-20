import {
  useGetFinancialReport,
  useGetProjectsReport,
  useGetEmployeesReport
} from "@/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/stat-card";
import { EmptyState } from "@/components/empty-state";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, DollarSign, Briefcase } from "lucide-react";
import { formatCurrency } from "@/lib/format";

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

const PROJECT_STATUS_LABELS: Record<string, string> = {
  planning: "Planificación",
  active: "Activo",
  on_hold: "En espera",
  completed: "Completado",
  cancelled: "Cancelado",
};

export default function Reports() {
  const { data: financialReport, isLoading: loadingFinancial } = useGetFinancialReport({});
  const { data: projectsReport, isLoading: loadingProjects } = useGetProjectsReport({});
  const { data: employeesReport, isLoading: loadingEmployees } = useGetEmployeesReport({});

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Reportes y Analíticas</h2>
        <p className="text-muted-foreground">Métricas detalladas sobre el rendimiento del negocio.</p>
      </div>

      <Tabs defaultValue="financial" className="space-y-6">
        <TabsList>
          <TabsTrigger value="financial">Financiero</TabsTrigger>
          <TabsTrigger value="projects">Proyectos</TabsTrigger>
          <TabsTrigger value="team">Equipo y Horas</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-6 m-0">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="Ingresos Totales"
              icon={TrendingUp}
              loading={loadingFinancial}
              value={formatCurrency(financialReport?.revenue || 0)}
              tone="success"
            />
            <StatCard
              title="Gastos Totales"
              icon={TrendingDown}
              loading={loadingFinancial}
              value={formatCurrency(financialReport?.expenses || 0)}
              tone="danger"
            />
            <StatCard
              title="Beneficio Neto"
              icon={DollarSign}
              loading={loadingFinancial}
              value={formatCurrency(financialReport?.profit || 0)}
              description={`Margen: ${financialReport?.profitMargin?.toFixed(1) || 0}%`}
              tone="primary"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Evolución Financiera</CardTitle>
              <CardDescription>Ingresos y gastos mes a mes</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingFinancial ? (
                <Skeleton className="h-[350px] w-full" />
              ) : financialReport?.byMonth && financialReport.byMonth.length > 0 ? (
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={financialReport.byMonth} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `€${value}`}
                      />
                      <RechartsTooltip
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                      />
                      <Legend />
                      <Bar dataKey="revenue" name="Ingresos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenses" name="Gastos" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex h-[350px] items-center justify-center text-muted-foreground border rounded-md border-dashed">
                  No hay datos financieros para mostrar.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6 m-0">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Proyectos por Estado</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingProjects ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : projectsReport?.byStatus && projectsReport.byStatus.length > 0 ? (
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={projectsReport.byStatus.map((entry) => ({
                            ...entry,
                            category: PROJECT_STATUS_LABELS[entry.category] ?? entry.category,
                          }))}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="count"
                          nameKey="category"
                        >
                          {projectsReport.byStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip contentStyle={{ backgroundColor: "hsl(var(--background))", borderRadius: "8px" }} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex h-[300px] items-center justify-center text-muted-foreground border rounded-md border-dashed">
                    No hay datos de proyectos.
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas de Proyectos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {loadingProjects ? (
                  <div className="space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <Briefcase className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total de Proyectos</p>
                        <h4 className="text-3xl font-bold">{projectsReport?.total || 0}</h4>
                      </div>
                    </div>
                    <div className="space-y-2 border-t pt-6">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Tasa de finalización</span>
                        <span className="text-sm font-medium">{projectsReport?.completionRate || 0}%</span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${projectsReport?.completionRate || 0}%` }}
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6 m-0">
          <Card>
            <CardHeader>
              <CardTitle>Horas por Departamento</CardTitle>
              <CardDescription>Distribución del tiempo registrado</CardDescription>
            </CardHeader>
            <CardContent>
              {loadingEmployees ? (
                <Skeleton className="h-[350px] w-full" />
              ) : employeesReport?.byDepartment && employeesReport.byDepartment.length > 0 ? (
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={employeesReport.byDepartment} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="category" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <RechartsTooltip
                        formatter={(value: number) => [`${value} horas`, 'Tiempo']}
                        contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                      />
                      <Bar dataKey="total" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex h-[350px] items-center justify-center text-muted-foreground border rounded-md border-dashed">
                  No hay registros de horas.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
