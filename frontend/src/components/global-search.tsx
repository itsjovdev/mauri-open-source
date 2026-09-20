import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { useLocation } from "wouter";
import {
  useListClients,
  useListProjects,
  useListInvoices,
  useListQuotes,
  getListClientsQueryKey,
  getListProjectsQueryKey,
  getListInvoicesQueryKey,
  getListQuotesQueryKey,
} from "@/api";
import { Search, Users, FolderKanban, FileSpreadsheet, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultItem {
  id: number;
  label: string;
  sublabel?: string;
  href: string;
  icon: typeof Users;
}

interface ResultGroup {
  label: string;
  items: ResultItem[];
}

const isMac = typeof navigator !== "undefined" && /Mac/i.test(navigator.platform);

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
      {children}
    </kbd>
  );
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    function handleShortcut(e: globalThis.KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 250);
    return () => clearTimeout(t);
  }, [query]);

  const enabled = open && debounced.length >= 2;

  const { data: clientsData } = useListClients({ search: debounced }, { query: { enabled, queryKey: getListClientsQueryKey({ search: debounced }) } });
  const { data: projectsData } = useListProjects({ search: debounced }, { query: { enabled, queryKey: getListProjectsQueryKey({ search: debounced }) } });
  const { data: invoicesData } = useListInvoices({ search: debounced }, { query: { enabled, queryKey: getListInvoicesQueryKey({ search: debounced }) } });
  const { data: quotesData } = useListQuotes({ search: debounced }, { query: { enabled, queryKey: getListQuotesQueryKey({ search: debounced }) } });

  const groups: ResultGroup[] = useMemo(() => [
    { label: "Clientes", items: (clientsData?.data || []).slice(0, 4).map((c) => ({ id: c.id, label: c.name, sublabel: c.company ?? undefined, href: `/clientes/${c.id}`, icon: Users })) },
    { label: "Proyectos", items: (projectsData?.data || []).slice(0, 4).map((p) => ({ id: p.id, label: p.name, sublabel: p.clientName ?? undefined, href: `/proyectos/${p.id}`, icon: FolderKanban })) },
    { label: "Facturas", items: (invoicesData?.data || []).slice(0, 4).map((i) => ({ id: i.id, label: i.invoiceNumber, sublabel: i.clientName ?? undefined, href: `/facturas/${i.id}`, icon: FileSpreadsheet })) },
    { label: "Presupuestos", items: (quotesData?.data || []).slice(0, 4).map((q) => ({ id: q.id, label: q.quoteNumber, sublabel: q.clientName ?? undefined, href: `/presupuestos/${q.id}`, icon: FileText })) },
  ].filter((g) => g.items.length > 0), [clientsData, projectsData, invoicesData, quotesData]);

  const flatItems = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  function goTo(href: string) {
    setLocation(href);
    setOpen(false);
  }

  function handleInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flatItems[activeIndex];
      if (item) goTo(item.href);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full max-w-md cursor-pointer items-center rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground shadow-none transition-colors hover:bg-accent/40"
      >
        <Search className="mr-2 h-4 w-4 shrink-0" />
        <span className="flex-1 truncate text-left">Buscar clientes, proyectos, facturas...</span>
        <span className="ml-2 hidden shrink-0 items-center gap-0.5 sm:flex">
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh]">
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl">
            <div className="flex items-center gap-2.5 border-b px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Buscar clientes, proyectos, facturas..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <Kbd>Esc</Kbd>
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              {debounced.length < 2 ? (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                  Escribe al menos 2 caracteres para buscar.
                </p>
              ) : groups.length === 0 ? (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                  Sin resultados para &quot;{debounced}&quot;.
                </p>
              ) : (
                groups.map((group) => (
                  <div key={group.label} className="mb-2 last:mb-0">
                    <p className="px-2.5 py-1 text-xs font-medium text-muted-foreground">{group.label}</p>
                    {group.items.map((item) => {
                      const flatIndex = flatItems.indexOf(item);
                      const isActive = flatIndex === activeIndex;
                      return (
                        <button
                          key={`${group.label}-${item.id}`}
                          type="button"
                          onMouseEnter={() => setActiveIndex(flatIndex)}
                          onClick={() => goTo(item.href)}
                          className={cn(
                            "flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm",
                            isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                          )}
                        >
                          <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <span className="truncate">{item.label}</span>
                          {item.sublabel && (
                            <span className="ml-auto shrink-0 truncate text-xs text-muted-foreground">{item.sublabel}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center gap-4 border-t bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
                Navegar
              </span>
              <span className="flex items-center gap-1">
                <Kbd>↵</Kbd>
                Abrir
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
