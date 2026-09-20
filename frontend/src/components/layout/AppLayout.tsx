import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CheckSquare,
  UserCircle,
  Clock,
  FileText,
  FileSpreadsheet,
  Receipt,
  BarChart3,
  Settings,
  Bell,
  Menu,
  PanelLeftClose,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GlobalSearch } from "@/components/global-search";

const navItems = [
  { title: "Inicio", url: "/", icon: LayoutDashboard },
  { title: "Clientes", url: "/clientes", icon: Users },
  { title: "Proyectos", url: "/proyectos", icon: FolderKanban },
  { title: "Tareas", url: "/tareas", icon: CheckSquare },
  { title: "Empleados", url: "/empleados", icon: UserCircle },
  { title: "Horas", url: "/horas", icon: Clock },
  { title: "Presupuestos", url: "/presupuestos", icon: FileText },
  { title: "Facturas", url: "/facturas", icon: FileSpreadsheet },
  { title: "Gastos", url: "/gastos", icon: Receipt },
  { title: "Reportes", url: "/reportes", icon: BarChart3 },
];

function AppSidebar() {
  const [location] = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex h-16 items-center border-b border-sidebar-border px-4 py-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
        {isCollapsed ? (
          <SidebarTrigger
            aria-label="Abrir menu lateral"
            title="Abrir menu lateral"
            className="mx-auto h-10 w-10 rounded-lg bg-sidebar-accent/40 p-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <img
              src="/images/logo.png"
              alt="MAURI"
              className="h-7 w-7 rounded-md object-contain"
            />
          </SidebarTrigger>
        ) : (
          <div className="flex h-full w-full items-center justify-between gap-2 text-sidebar-foreground">
            <div className="flex min-w-0 items-center gap-3 font-semibold">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent/40">
                <img
                  src="/images/logo.png"
                  alt="MAURI"
                  className="h-7 w-7 translate-y-px rounded-md object-contain"
                />
              </span>
              <span className="translate-y-px truncate text-base leading-none">
                MAURI
              </span>
            </div>
            <SidebarTrigger
              aria-label="Cerrar menu lateral"
              title="Cerrar menu lateral"
              className="h-8 w-8 shrink-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <PanelLeftClose className="h-4 w-4" />
            </SidebarTrigger>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:px-0">
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent className="group-data-[collapsible=icon]:grid group-data-[collapsible=icon]:place-items-center">
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  location === item.url ||
                  (item.url !== "/" && location.startsWith(item.url));

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-2 py-3 group-data-[collapsible=icon]:px-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Configuracion">
              <Link href="/configuracion">
                <Settings />
                <span>Configuracion</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center gap-4 border-b bg-background px-4 shadow-sm sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="md:hidden"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Alternar menu</span>
      </Button>

      <div className="w-full flex-1">
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative hidden sm:flex">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
          <span className="sr-only">Notificaciones</span>
        </Button>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback className="bg-primary/10 text-primary">
            AD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
