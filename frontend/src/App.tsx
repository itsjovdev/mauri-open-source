import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";

import Dashboard from "@/pages/Dashboard";
import Clients from "@/pages/Clients";
import ClientDetail from "@/pages/ClientDetail";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import Tasks from "@/pages/Tasks";
import Employees from "@/pages/Employees";
import EmployeeDetail from "@/pages/EmployeeDetail";
import TimeTracking from "@/pages/TimeTracking";
import Quotes from "@/pages/Quotes";
import QuoteDetail from "@/pages/QuoteDetail";
import QuoteEditor from "@/features/quotes/QuoteEditor";
import Invoices from "@/pages/Invoices";
import InvoiceDetail from "@/pages/InvoiceDetail";
import Expenses from "@/pages/Expenses";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";

const NotFound = () => <div className="p-8"><h1 className="text-2xl font-bold">404 No Encontrado</h1><p className="mt-2 text-muted-foreground">La página solicitada no existe.</p></div>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/" component={Dashboard} />

        <Route path="/clientes" component={Clients} />
        <Route path="/clientes/:id" component={ClientDetail} />

        <Route path="/proyectos" component={Projects} />
        <Route path="/proyectos/:id" component={ProjectDetail} />

        <Route path="/tareas" component={Tasks} />

        <Route path="/empleados" component={Employees} />
        <Route path="/empleados/:id" component={EmployeeDetail} />

        <Route path="/horas" component={TimeTracking} />

        <Route path="/presupuestos" component={Quotes} />
        <Route path="/presupuestos/nuevo" component={QuoteEditor} />
        <Route path="/presupuestos/:id/editar" component={QuoteEditor} />
        <Route path="/presupuestos/:id" component={QuoteDetail} />

        <Route path="/facturas" component={Invoices} />
        <Route path="/facturas/:id" component={InvoiceDetail} />

        <Route path="/gastos" component={Expenses} />

        <Route path="/reportes" component={Reports} />

        <Route path="/configuracion" component={Settings} />

        <Route component={NotFound} />
      </Switch>
    </AppLayout>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
