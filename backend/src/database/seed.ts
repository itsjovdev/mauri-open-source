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


export async function seedAll(dataSource: DataSource): Promise<void> {
  const clients = dataSource.getRepository(Client);
  if ((await clients.count()) > 0) return;

  const today = new Date().toISOString().slice(0, 10);

  const [c1, c2] = await clients.save([
    clients.create({ name: "prueba1", company: "Prueba 1 S.L.", email: "prueba1@example.com", phone: "600000001", city: "Madrid", country: "España", status: "active" }),
    clients.create({ name: "prueba2", company: "Prueba 2 S.L.", email: "prueba2@example.com", phone: "600000002", city: "Barcelona", country: "España", status: "active" }),
  ]);

  const employees = dataSource.getRepository(Employee);
  const [e1, e2] = await employees.save([
    employees.create({ firstName: "Ana", lastName: "García", email: "ana@example.com", department: "Desarrollo", position: "Full-stack", status: "active", hireDate: new Date() }),
    employees.create({ firstName: "Luis", lastName: "Martín", email: "luis@example.com", department: "Diseño", position: "UX/UI", status: "active", hireDate: new Date() }),
  ]);

  const projects = dataSource.getRepository(Project);
  const [p1, p2] = await projects.save([
    projects.create({ name: "Proyecto Prueba 1", description: "Web corporativa", clientId: c1.id, status: "active", priority: "high", progress: 40, budget: 15000, startDate: new Date() }),
    projects.create({ name: "Proyecto Prueba 2", description: "App móvil", clientId: c2.id, status: "planning", priority: "medium", progress: 10, budget: 22000, startDate: new Date() }),
  ]);

  const tasks = dataSource.getRepository(Task);
  await tasks.save([
    tasks.create({ title: "Diseñar landing", projectId: p1.id, assigneeId: e2.id, status: "in_progress", priority: "high", estimatedHours: 12, dueDate: new Date() }),
    tasks.create({ title: "API de clientes", projectId: p1.id, assigneeId: e1.id, status: "todo", priority: "medium", estimatedHours: 20, dueDate: new Date() }),
    tasks.create({ title: "Wireframes app", projectId: p2.id, assigneeId: e2.id, status: "todo", priority: "low", estimatedHours: 8, dueDate: new Date() }),
  ]);

  const quotes = dataSource.getRepository(Quote);
  const quoteItems = [{ description: "Desarrollo web", quantity: 10, unitPrice: 100, discount: 0, tax: 210, total: 1210 }];
  await quotes.save(
    quotes.create({ quoteNumber: "PRES-0001", clientId: c1.id, projectId: p1.id, status: "draft", title: "Presupuesto web", items: quoteItems, ...computeTotals(quoteItems), validUntil: today }),
  );

  const invoices = dataSource.getRepository(Invoice);
  const invoiceItems = [{ description: "Fase 1", quantity: 1, unitPrice: 5000, discount: 0, tax: 1050, total: 6050 }];
  const invoiceTotals = computeTotals(invoiceItems);
  const [inv1] = await invoices.save([
    invoices.create({ invoiceNumber: "FACT-0001", clientId: c1.id, projectId: p1.id, status: "paid", title: "Factura fase 1", items: invoiceItems, ...invoiceTotals, paidAmount: invoiceTotals.total, dueDate: today }),
    invoices.create({ invoiceNumber: "FACT-0002", clientId: c2.id, projectId: p2.id, status: "pending", title: "Anticipo", items: invoiceItems, ...invoiceTotals, paidAmount: 0, dueDate: today }),
  ]);

  const expenses = dataSource.getRepository(Expense);
  await expenses.save([
    expenses.create({ description: "Hosting anual", amount: 300, date: today, category: "Infraestructura", supplier: "OVH", projectId: p1.id }),
    expenses.create({ description: "Licencias diseño", amount: 600, date: today, category: "Software", supplier: "Adobe", projectId: p2.id }),
  ]);

  const timeEntries = dataSource.getRepository(TimeEntry);
  await timeEntries.save([
    timeEntries.create({ employeeId: e1.id, projectId: p1.id, description: "Backend", date: today, hours: 6 }),
    timeEntries.create({ employeeId: e2.id, projectId: p1.id, description: "Diseño", date: today, hours: 4 }),
    timeEntries.create({ employeeId: e1.id, projectId: p2.id, description: "Setup inicial", date: today, hours: 3 }),
  ]);

  const activity = dataSource.getRepository(ActivityLog);
  await activity.save([
    activity.create({ type: "client_created", description: 'Cliente "prueba1" creado', entityId: c1.id, entityType: "client" }),
    activity.create({ type: "project_created", description: 'Proyecto "Proyecto Prueba 1" creado', entityId: p1.id, entityType: "project" }),
    activity.create({ type: "invoice_created", description: "Factura FACT-0001 creada", entityId: inv1.id, entityType: "invoice" }),
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
      ? "✓ Datos de prueba insertados (prueba1, prueba2, proyectos, tareas, facturas, etc.)"
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
