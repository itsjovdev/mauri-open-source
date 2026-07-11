import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "./config/typeorm.options.js";
import { ActivityModule } from "./modules/activity/activity.module.js";
import { ClientsModule } from "./modules/clients/clients.module.js";
import { DashboardModule } from "./modules/dashboard/dashboard.module.js";
import { EmployeesModule } from "./modules/employees/employees.module.js";
import { ExpensesModule } from "./modules/expenses/expenses.module.js";
import { HealthController } from "./modules/health/health.controller.js";
import { InvoicesModule } from "./modules/invoices/invoices.module.js";
import { ProjectsModule } from "./modules/projects/projects.module.js";
import { QuotesModule } from "./modules/quotes/quotes.module.js";
import { ReportsModule } from "./modules/reports/reports.module.js";
import { TasksModule } from "./modules/tasks/tasks.module.js";
import { TimeEntriesModule } from "./modules/time-entries/time-entries.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: () => dataSourceOptions() }),
    ActivityModule,
    ClientsModule,
    EmployeesModule,
    ProjectsModule,
    TasksModule,
    QuotesModule,
    InvoicesModule,
    ExpensesModule,
    TimeEntriesModule,
    DashboardModule,
    ReportsModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
