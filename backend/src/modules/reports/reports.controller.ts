import { Controller, Get, Query } from "@nestjs/common";
import { QueryFinancialReportDto } from "./dto/query-financial-report.dto.js";
import { ReportsService } from "./reports.service.js";

@Controller("reports")
export class ReportsController {
  constructor(private readonly reports: ReportsService) {}

  @Get("financial")
  financial(@Query() query: QueryFinancialReportDto) {
    return this.reports.financial(query);
  }

  @Get("projects")
  projects() {
    return this.reports.projects();
  }

  @Get("employees")
  employees() {
    return this.reports.employees();
  }
}
