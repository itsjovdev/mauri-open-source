import type { DataSourceOptions } from "typeorm";
import { IS_MEMORY_DB } from "../common/db-types.js";
import { Client } from "../modules/clients/client.entity.js";
import { Employee } from "../modules/employees/employee.entity.js";
import { Project } from "../modules/projects/project.entity.js";
import { Task } from "../modules/tasks/task.entity.js";
import { Quote } from "../modules/quotes/quote.entity.js";
import { Invoice } from "../modules/invoices/invoice.entity.js";
import { Expense } from "../modules/expenses/expense.entity.js";
import { TimeEntry } from "../modules/time-entries/time-entry.entity.js";
import { ActivityLog } from "../modules/activity/activity-log.entity.js";

export const entities = [
  Client,
  Employee,
  Project,
  Task,
  Quote,
  Invoice,
  Expense,
  TimeEntry,
  ActivityLog,
];


export function dataSourceOptions(): DataSourceOptions {
  const logging = process.env.DB_LOGGING === "true";
  if (IS_MEMORY_DB) {
    return {
      type: "sqljs",
      autoSave: false,
      entities,
      synchronize: true,
      logging,
    };
  }

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL must be set.");
  }

  return {
    type: "postgres",
    url,
    entities,
    migrations: ["src/database/migrations/*.ts"],
    synchronize: false,
    logging,
  };
}
