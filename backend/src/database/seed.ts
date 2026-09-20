import "reflect-metadata";
import "dotenv/config";
import { pathToFileURL } from "node:url";
import { DataSource } from "typeorm";
import { dataSourceOptions } from "../config/typeorm.options.js";
import { computeTotals } from "../common/utils/totals.js";
import { ActivityLog } from "../modules/activity/activity-log.entity.js";
import { Client } from "../modules/clients/client.entity.js";
import { Employee } from "../modules/employees/employee.entity.js";
import { Expense } from "../modules/expenses/expense.entity.js";
import { Invoice } from "../modules/invoices/invoice.entity.js";
import { Project } from "../modules/projects/project.entity.js";
import { Quote } from "../modules/quotes/quote.entity.js";
import { Task } from "../modules/tasks/task.entity.js";
import { TimeEntry } from "../modules/time-entries/time-entry.entity.js";

const TAX_RATE = 0.21;

function makeItem(description: string, quantity: number, unitPrice: number, discount = 0) {
  const subtotal = quantity * unitPrice - discount;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;
  return { description, quantity, unitPrice, discount, tax, total };
}

function daysFromToday(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

export async function seedAll(dataSource: DataSource): Promise<void> {
  const clientsRepo = dataSource.getRepository(Client);
  if ((await clientsRepo.count()) > 0) return;

  const today = daysFromToday(0);

  const clientDefs: Partial<Client>[] = [
    { name: "prueba1", company: "Prueba 1 S.L.", email: "prueba1@example.com", phone: "600000001", city: "Madrid", country: "España", status: "active" },
    { name: "prueba2", company: "Prueba 2 S.L.", email: "prueba2@example.com", phone: "600000002", city: "Barcelona", country: "España", status: "active" },
    { name: "Laura Domínguez", company: "Nordic Studio", email: "laura@nordicstudio.es", phone: "600000003", city: "Valencia", country: "España", status: "active" },
    { name: "Carlos Iglesias", company: "Iglesias Consulting", email: "carlos@iglesiasconsulting.com", phone: "600000004", city: "Sevilla", country: "España", status: "active" },
    { name: "Marta Ferrer", company: "Ferrer & Asociados", email: "marta@ferrerasociados.es", phone: "600000005", city: "Bilbao", country: "España", status: "inactive" },
    { name: "Diego Romero", company: "Romero Digital", email: "diego@romerodigital.com", phone: "600000006", city: "Zaragoza", country: "España", status: "active" },
    { name: "Elena Castro", company: "Castro Media", email: "elena@castromedia.es", phone: "600000007", city: "Málaga", country: "España", status: "active" },
    { name: "Javier Molina", company: "Molina Retail", email: "javier@molinaretail.com", phone: "600000008", city: "Murcia", country: "España", status: "active" },
    { name: "Sara Navarro", company: "Navarro Legal", email: "sara@navarrolegal.es", phone: "600000009", city: "Palma", country: "España", status: "active" },
    { name: "Pablo Serrano", company: "Serrano Fitness", email: "pablo@serranofitness.com", phone: "600000010", city: "Alicante", country: "España", status: "inactive" },
    { name: "Cristina Ortiz", company: "Ortiz Arquitectura", email: "cristina@ortizarq.es", phone: "600000011", city: "Vigo", country: "España", status: "active" },
    { name: "Raúl Delgado", company: "Delgado Logística", email: "raul@delgadologistica.com", phone: "600000012", city: "Córdoba", country: "España", status: "active" },
    { name: "Beatriz Vidal", company: "Vidal Marketing", email: "beatriz@vidalmarketing.es", phone: "600000013", city: "Valladolid", country: "España", status: "active" },
    { name: "Óscar Peña", company: "Peña Software", email: "oscar@penasoftware.com", phone: "600000014", city: "Gijón", country: "España", status: "active" },
    { name: "Nuria Cabrera", company: "Cabrera Interiorismo", email: "nuria@cabrerainterior.es", phone: "600000015", city: "Granada", country: "España", status: "active" },
    { name: "Álvaro Reyes", company: "Reyes Import/Export", email: "alvaro@reyesie.com", phone: "600000016", city: "Elche", country: "España", status: "inactive" },
    { name: "Patricia León", company: "León Educación", email: "patricia@leoneducacion.es", phone: "600000017", city: "Oviedo", country: "España", status: "active" },
    { name: "Fernando Gil", company: "Gil Construcción", email: "fernando@gilconstruccion.com", phone: "600000018", city: "Badalona", country: "España", status: "active" },
    { name: "Sandra Ruiz", company: "Ruiz Salud", email: "sandra@ruizsalud.es", phone: "600000019", city: "Cartagena", country: "España", status: "active" },
    { name: "Iván Blanco", company: "Blanco Turismo", email: "ivan@blancoturismo.com", phone: "600000020", city: "Santander", country: "España", status: "active" },
    { name: "Marina Soto", company: "Soto Eventos", email: "marina@sotoeventos.es", phone: "600000021", city: "Almería", country: "España", status: "active" },
    { name: "Tomás Guerrero", company: "Guerrero Energía", email: "tomas@guerreroenergia.com", phone: "600000022", city: "Burgos", country: "España", status: "active" },
    { name: "Alicia Campos", company: "Campos Moda", email: "alicia@camposmoda.es", phone: "600000023", city: "San Sebastián", country: "España", status: "active" },
    { name: "Rubén Nieto", company: "Nieto Ingeniería", email: "ruben@nietoingenieria.com", phone: "600000024", city: "Pamplona", country: "España", status: "active" },
    { name: "Cristian Vega", company: "Vega Consultores", email: "cristian@vegaconsultores.es", phone: "600000025", city: "Toledo", country: "España", status: "active" },
  ];
  const clients = await clientsRepo.save(clientDefs.map((c) => clientsRepo.create(c)));
  const [c1, c2, c3, c4, , c6, c7, c8, c9] = clients;

  const employeesRepo = dataSource.getRepository(Employee);
  const employees = await employeesRepo.save([
    employeesRepo.create({ firstName: "Ana", lastName: "García", email: "ana@example.com", department: "Desarrollo", position: "Full-stack", status: "active", hireDate: new Date("2023-02-01") }),
    employeesRepo.create({ firstName: "Luis", lastName: "Martín", email: "luis@example.com", department: "Diseño", position: "UX/UI", status: "active", hireDate: new Date("2023-05-10") }),
    employeesRepo.create({ firstName: "María", lastName: "López", email: "maria@example.com", department: "Desarrollo", position: "Backend", status: "active", hireDate: new Date("2022-09-15") }),
    employeesRepo.create({ firstName: "Jorge", lastName: "Sánchez", email: "jorge@example.com", department: "Ventas", position: "Account Manager", status: "active", hireDate: new Date("2024-01-20") }),
    employeesRepo.create({ firstName: "Lucía", lastName: "Fernández", email: "lucia@example.com", department: "Marketing", position: "Growth", status: "active", hireDate: new Date("2023-11-03") }),
    employeesRepo.create({ firstName: "Pedro", lastName: "Ramos", email: "pedro@example.com", department: "Desarrollo", position: "DevOps", status: "inactive", hireDate: new Date("2021-06-12") }),
  ]);
  const [e1, e2, e3, e4, e5] = employees;

  const projectsRepo = dataSource.getRepository(Project);
  const projects = await projectsRepo.save([
    projectsRepo.create({ name: "Proyecto Prueba 1", description: "Web corporativa", clientId: c1.id, status: "active", priority: "high", progress: 40, budget: 15000, startDate: new Date() }),
    projectsRepo.create({ name: "Proyecto Prueba 2", description: "App móvil", clientId: c2.id, status: "planning", priority: "medium", progress: 10, budget: 22000, startDate: new Date() }),
    projectsRepo.create({ name: "Rediseño e-commerce", description: "Tienda online completa", clientId: c3.id, status: "active", priority: "urgent", progress: 65, budget: 30000, startDate: new Date("2026-06-01"), deadline: new Date("2026-11-01") }),
    projectsRepo.create({ name: "Auditoría de marca", description: "Branding y naming", clientId: c4.id, status: "completed", priority: "medium", progress: 100, budget: 8000, startDate: new Date("2026-01-10"), deadline: new Date("2026-03-01") }),
    projectsRepo.create({ name: "Portal de clientes", description: "Área privada con facturación", clientId: c6.id, status: "on_hold", priority: "low", progress: 25, budget: 18000, startDate: new Date("2026-04-01") }),
    projectsRepo.create({ name: "App de reservas", description: "Reservas y pagos online", clientId: c7.id, status: "active", priority: "high", progress: 55, budget: 27000, startDate: new Date("2026-05-15"), deadline: new Date("2026-12-15") }),
    projectsRepo.create({ name: "Migración a la nube", description: "Infraestructura AWS", clientId: c8.id, status: "planning", priority: "medium", progress: 5, budget: 20000, startDate: new Date() }),
    projectsRepo.create({ name: "Landing de captación", description: "Landing + campaña ads", clientId: c9.id, status: "cancelled", priority: "low", progress: 15, budget: 4000, startDate: new Date("2026-02-01") }),
  ]);
  const [p1, p2, p3, p4, p5, p6, p7] = projects;

  const tasksRepo = dataSource.getRepository(Task);
  await tasksRepo.save([
    tasksRepo.create({ title: "Diseñar landing", description: "Landing page principal con hero y CTA", projectId: p1.id, assigneeId: e2.id, status: "in_progress", priority: "high", estimatedHours: 12, dueDate: new Date(daysFromToday(2)) }),
    tasksRepo.create({ title: "API de clientes", description: "Endpoints CRUD de clientes", projectId: p1.id, assigneeId: e1.id, status: "todo", priority: "medium", estimatedHours: 20, dueDate: new Date(daysFromToday(5)) }),
    tasksRepo.create({ title: "Wireframes app", description: "Wireframes de las pantallas principales", projectId: p2.id, assigneeId: e2.id, status: "todo", priority: "low", estimatedHours: 8, dueDate: new Date(daysFromToday(7)) }),
    tasksRepo.create({ title: "Checkout de pago", description: "Integración con pasarela de pago", projectId: p3.id, assigneeId: e3.id, status: "in_progress", priority: "urgent", estimatedHours: 25, dueDate: new Date(daysFromToday(3)) }),
    tasksRepo.create({ title: "Catálogo de productos", description: "Listado y filtros de productos", projectId: p3.id, assigneeId: e1.id, status: "in_review", priority: "high", estimatedHours: 18, dueDate: new Date(daysFromToday(1)) }),
    tasksRepo.create({ title: "Optimización SEO", description: "Metadatos y sitemap", projectId: p3.id, assigneeId: e5.id, status: "backlog", priority: "low", estimatedHours: 6 }),
    tasksRepo.create({ title: "Manual de marca", description: "Guía de estilo y logotipo final", projectId: p4.id, assigneeId: e2.id, status: "done", priority: "medium", estimatedHours: 15 }),
    tasksRepo.create({ title: "Naming final", description: "Selección de nombre definitivo", projectId: p4.id, assigneeId: e4.id, status: "done", priority: "medium", estimatedHours: 4 }),
    tasksRepo.create({ title: "Login de clientes", description: "Autenticación y recuperación de contraseña", projectId: p5.id, assigneeId: e3.id, status: "todo", priority: "medium", estimatedHours: 10 }),
    tasksRepo.create({ title: "Panel de facturación", description: "Historial de facturas del cliente", projectId: p5.id, assigneeId: e1.id, status: "backlog", priority: "low", estimatedHours: 14 }),
    tasksRepo.create({ title: "Calendario de reservas", description: "Vista de disponibilidad", projectId: p6.id, assigneeId: e2.id, status: "in_progress", priority: "high", estimatedHours: 22, dueDate: new Date(daysFromToday(4)) }),
    tasksRepo.create({ title: "Notificaciones por email", description: "Confirmaciones y recordatorios", projectId: p6.id, assigneeId: e3.id, status: "todo", priority: "medium", estimatedHours: 9 }),
    tasksRepo.create({ title: "Pruebas de carga", description: "Tests de estrés en reservas", projectId: p6.id, assigneeId: e5.id, status: "backlog", priority: "medium", estimatedHours: 8 }),
    tasksRepo.create({ title: "Inventario de servicios", description: "Auditoría de servicios actuales en AWS", projectId: p7.id, assigneeId: e5.id, status: "todo", priority: "medium", estimatedHours: 16 }),
    tasksRepo.create({ title: "Plan de migración", description: "Documento con fases y tiempos", projectId: p7.id, assigneeId: e4.id, status: "in_review", priority: "high", estimatedHours: 10, dueDate: new Date(daysFromToday(6)) }),
  ]);

  const quotesRepo = dataSource.getRepository(Quote);
  const quoteDefs = [
    { quoteNumber: "PRES-0001", clientId: c1.id, projectId: p1.id, status: "draft" as const, title: "Presupuesto web", items: [makeItem("Desarrollo web", 10, 100)], validUntil: daysFromToday(10) },
    { quoteNumber: "PRES-0002", clientId: c3.id, projectId: p3.id, status: "sent" as const, title: "Rediseño tienda online", items: [makeItem("Diseño UX/UI", 20, 60), makeItem("Desarrollo frontend", 40, 55)], validUntil: daysFromToday(15) },
    { quoteNumber: "PRES-0003", clientId: c4.id, projectId: p4.id, status: "approved" as const, title: "Auditoría de marca", items: [makeItem("Sesión de branding", 1, 2500)], validUntil: daysFromToday(-2) },
    { quoteNumber: "PRES-0004", clientId: c6.id, projectId: p5.id, status: "rejected" as const, title: "Portal de clientes - Fase 2", items: [makeItem("Desarrollo backend", 30, 65)], validUntil: daysFromToday(-10) },
    { quoteNumber: "PRES-0005", clientId: c7.id, projectId: p6.id, status: "expired" as const, title: "App de reservas - Mantenimiento anual", items: [makeItem("Soporte y mantenimiento", 12, 250)], validUntil: daysFromToday(-30) },
    { quoteNumber: "PRES-0006", clientId: c8.id, projectId: p7.id, status: "sent" as const, title: "Migración a la nube", items: [makeItem("Consultoría de migración", 40, 90)], validUntil: daysFromToday(20) },
  ];
  await quotesRepo.save(
    quoteDefs.map((q) => quotesRepo.create({ ...q, ...computeTotals(q.items) })),
  );

  const invoicesRepo = dataSource.getRepository(Invoice);
  const invoiceDefs = [
    { invoiceNumber: "FACT-0001", clientId: c1.id, projectId: p1.id, status: "paid" as const, title: "Factura fase 1", items: [makeItem("Fase 1 - Desarrollo", 1, 5000)], dueDate: today, paidRatio: 1 },
    { invoiceNumber: "FACT-0002", clientId: c2.id, projectId: p2.id, status: "pending" as const, title: "Anticipo", items: [makeItem("Anticipo 30%", 1, 6600)], dueDate: daysFromToday(15), paidRatio: 0 },
    { invoiceNumber: "FACT-0003", clientId: c3.id, projectId: p3.id, status: "partial" as const, title: "Rediseño tienda online - 1er pago", items: [makeItem("Diseño y maquetación", 1, 8000)], dueDate: daysFromToday(5), paidRatio: 0.5 },
    { invoiceNumber: "FACT-0004", clientId: c4.id, projectId: p4.id, status: "paid" as const, title: "Auditoría de marca", items: [makeItem("Branding completo", 1, 8000)], dueDate: daysFromToday(-20), paidRatio: 1 },
    { invoiceNumber: "FACT-0005", clientId: c7.id, projectId: p6.id, status: "sent" as const, title: "App de reservas - Fase 1", items: [makeItem("Desarrollo Fase 1", 1, 12000)], dueDate: daysFromToday(10), paidRatio: 0 },
    { invoiceNumber: "FACT-0006", clientId: c9.id, status: "cancelled" as const, title: "Servicios de consultoría", items: [makeItem("Consultoría puntual", 4, 150)], dueDate: daysFromToday(-5), paidRatio: 0 },
    { invoiceNumber: "FACT-0007", clientId: c6.id, projectId: p5.id, status: "pending" as const, title: "Portal de clientes - Fase 1", items: [makeItem("Desarrollo Fase 1", 1, 9000)], dueDate: daysFromToday(-3), paidRatio: 0 },
    { invoiceNumber: "FACT-0008", clientId: c8.id, projectId: p7.id, status: "draft" as const, title: "Migración a la nube - Propuesta", items: [makeItem("Consultoría inicial", 1, 3600)], dueDate: daysFromToday(30), paidRatio: 0 },
  ];
  const savedInvoices = await invoicesRepo.save(
    invoiceDefs.map(({ paidRatio, ...inv }) => {
      const totals = computeTotals(inv.items);
      return invoicesRepo.create({ ...inv, ...totals, paidAmount: Math.round(totals.total * paidRatio * 100) / 100 });
    }),
  );
  const inv1 = savedInvoices[0];

  const expensesRepo = dataSource.getRepository(Expense);
  await expensesRepo.save([
    expensesRepo.create({ description: "Hosting anual", amount: 300, date: today, category: "Infraestructura", supplier: "OVH", projectId: p1.id }),
    expensesRepo.create({ description: "Licencias diseño", amount: 600, date: today, category: "Software", supplier: "Adobe", projectId: p2.id }),
    expensesRepo.create({ description: "Suscripción Figma equipo", amount: 180, date: daysFromToday(-5), category: "Software", supplier: "Figma" }),
    expensesRepo.create({ description: "Servidor de staging", amount: 90, date: daysFromToday(-3), category: "Infraestructura", supplier: "DigitalOcean", projectId: p3.id }),
    expensesRepo.create({ description: "Publicidad campaña", amount: 450, date: daysFromToday(-10), category: "Marketing", supplier: "Meta Ads", projectId: p7.id }),
    expensesRepo.create({ description: "Material de oficina", amount: 75, date: daysFromToday(-15), category: "Oficina", supplier: "Amazon Business" }),
    expensesRepo.create({ description: "Viaje reunión cliente", amount: 220, date: daysFromToday(-8), category: "Viajes", supplier: "Renfe", projectId: p6.id }),
    expensesRepo.create({ description: "Certificado SSL", amount: 60, date: daysFromToday(-20), category: "Infraestructura", supplier: "Sectigo", projectId: p5.id }),
    expensesRepo.create({ description: "Curso de formación AWS", amount: 350, date: daysFromToday(-12), category: "Formación", supplier: "AWS Training", projectId: p7.id }),
    expensesRepo.create({ description: "Café y catering evento", amount: 130, date: daysFromToday(-2), category: "Oficina", supplier: "Local" }),
  ]);

  const timeEntriesRepo = dataSource.getRepository(TimeEntry);
  await timeEntriesRepo.save([
    timeEntriesRepo.create({ employeeId: e1.id, projectId: p1.id, description: "Backend", date: today, hours: 6 }),
    timeEntriesRepo.create({ employeeId: e2.id, projectId: p1.id, description: "Diseño", date: today, hours: 4 }),
    timeEntriesRepo.create({ employeeId: e1.id, projectId: p2.id, description: "Setup inicial", date: today, hours: 3 }),
    timeEntriesRepo.create({ employeeId: e3.id, projectId: p3.id, description: "Integración pasarela de pago", date: daysFromToday(-1), hours: 7 }),
    timeEntriesRepo.create({ employeeId: e1.id, projectId: p3.id, description: "Catálogo de productos", date: daysFromToday(-1), hours: 5 }),
    timeEntriesRepo.create({ employeeId: e5.id, projectId: p3.id, description: "SEO técnico", date: daysFromToday(-2), hours: 3 }),
    timeEntriesRepo.create({ employeeId: e2.id, projectId: p4.id, description: "Manual de marca", date: daysFromToday(-6), hours: 8 }),
    timeEntriesRepo.create({ employeeId: e4.id, projectId: p4.id, description: "Reunión de naming", date: daysFromToday(-7), hours: 2 }),
    timeEntriesRepo.create({ employeeId: e3.id, projectId: p5.id, description: "Login de clientes", date: daysFromToday(-3), hours: 6 }),
    timeEntriesRepo.create({ employeeId: e2.id, projectId: p6.id, description: "Calendario de reservas", date: daysFromToday(-2), hours: 9 }),
    timeEntriesRepo.create({ employeeId: e3.id, projectId: p6.id, description: "Notificaciones email", date: daysFromToday(-4), hours: 4 }),
    timeEntriesRepo.create({ employeeId: e5.id, projectId: p6.id, description: "Pruebas de carga", date: daysFromToday(-5), hours: 5 }),
    timeEntriesRepo.create({ employeeId: e5.id, projectId: p7.id, description: "Inventario AWS", date: daysFromToday(-1), hours: 6 }),
    timeEntriesRepo.create({ employeeId: e4.id, projectId: p7.id, description: "Plan de migración", date: daysFromToday(-2), hours: 3 }),
    timeEntriesRepo.create({ employeeId: e1.id, projectId: p1.id, description: "Revisión de código", date: daysFromToday(-3), hours: 2 }),
  ]);

  const activityRepo = dataSource.getRepository(ActivityLog);
  await activityRepo.save([
    activityRepo.create({ type: "client_created", description: 'Cliente "prueba1" creado', entityId: c1.id, entityType: "client" }),
    activityRepo.create({ type: "project_created", description: 'Proyecto "Proyecto Prueba 1" creado', entityId: p1.id, entityType: "project" }),
    activityRepo.create({ type: "invoice_created", description: "Factura FACT-0001 creada", entityId: inv1.id, entityType: "invoice" }),
    activityRepo.create({ type: "project_created", description: 'Proyecto "Rediseño e-commerce" creado', entityId: p3.id, entityType: "project" }),
    activityRepo.create({ type: "quote_created", description: "Presupuesto PRES-0002 enviado", entityType: "quote" }),
    activityRepo.create({ type: "invoice_created", description: "Factura FACT-0005 enviada", entityType: "invoice" }),
  ]);
}

async function runCli(): Promise<void> {
  const dataSource = new DataSource(dataSourceOptions());
  await dataSource.initialize();
  const before = await dataSource.getRepository(Client).count();
  await seedAll(dataSource);
  const after = await dataSource.getRepository(Client).count();
  console.log(
    after > before
      ? "✓ Datos de prueba insertados (clientes, proyectos, tareas, presupuestos, facturas, gastos, horas, etc.)"
      : "- La base de datos ya tenía datos; no se insertó nada.",
  );
  await dataSource.destroy();
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli().catch((error) => {
    console.error("Error al ejecutar el seed:", error);
    process.exit(1);
  });
}
