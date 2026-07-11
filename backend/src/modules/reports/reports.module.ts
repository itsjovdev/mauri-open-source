import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Employee } from "../employees/employee.entity.js";
import { MetricsModule } from "../metrics/metrics.module.js";
import { Project } from "../projects/project.entity.js";
import { TimeEntry } from "../time-entries/time-entry.entity.js";
import { ReportsController } from "./reports.controller.js";
import { ReportsService } from "./reports.service.js";

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, Employee, TimeEntry]),
    MetricsModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
