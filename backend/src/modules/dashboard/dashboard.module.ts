import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActivityModule } from "../activity/activity.module.js";
import { Client } from "../clients/client.entity.js";
import { Invoice } from "../invoices/invoice.entity.js";
import { MetricsModule } from "../metrics/metrics.module.js";
import { Project } from "../projects/project.entity.js";
import { TasksModule } from "../tasks/tasks.module.js";
import { TimeEntry } from "../time-entries/time-entry.entity.js";
import { DashboardController } from "./dashboard.controller.js";
import { DashboardService } from "./dashboard.service.js";

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Project, Invoice, TimeEntry]),
    MetricsModule,
    TasksModule,
    ActivityModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
