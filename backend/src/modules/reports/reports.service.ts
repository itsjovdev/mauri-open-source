import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Employee } from "../employees/employee.entity.js";
import { FinanceMetricsService } from "../metrics/finance-metrics.service.js";
import { Project } from "../projects/project.entity.js";
import { TimeEntry } from "../time-entries/time-entry.entity.js";
import { QueryFinancialReportDto } from "./dto/query-financial-report.dto.js";

interface CategoryCount {
  category: string;
  total: number;
  count: number;
}

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepo: Repository<Project>,
    @InjectRepository(Employee)
    private readonly employeesRepo: Repository<Employee>,
    @InjectRepository(TimeEntry)
    private readonly timeEntriesRepo: Repository<TimeEntry>,
    private readonly metrics: FinanceMetricsService,
  ) {}

  async financial(query: QueryFinancialReportDto) {
    const now = new Date();
    const from =
      query.dateFrom ??
      new Date(now.getFullYear(), 0, 1).toISOString().slice(0, 10);
    const to = query.dateTo ?? now.toISOString().slice(0, 10);

    const { revenue, expenses, profit } = await this.metrics.range(from, to);
    const byMonth = await this.metrics.monthsBetween(from, to);

    return {
      revenue,
      expenses,
      profit,
      profitMargin: revenue > 0 ? (profit / revenue) * 100 : 0,
      byMonth,
    };
  }

  async projects() {
    const total = await this.projectsRepo.count();
    const byStatus = await this.groupCount("status");
    const byPriority = await this.groupCount("priority");
    const avgRow = await this.projectsRepo
      .createQueryBuilder("p")
      .select("AVG(p.progress)", "avg")
      .getRawOne<{ avg: string }>();

    const completed =
      byStatus.find((r) => r.category === "completed")?.count ?? 0;

    return {
      total,
      byStatus,
      byPriority,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      avgProgress: Number(avgRow?.avg ?? 0),
    };
  }

  async employees() {
    const total = await this.employeesRepo.count();
    const active = await this.employeesRepo.count({ where: { status: "active" } });

    const hoursRow = await this.timeEntriesRepo
      .createQueryBuilder("te")
      .select("COALESCE(SUM(te.hours), 0)", "total")
      .getRawOne<{ total: string }>();
    const totalHours = Number(hoursRow?.total ?? 0);

    const byDepartmentRows = await this.employeesRepo
      .createQueryBuilder("e")
      .select("COALESCE(e.department, 'Sin departamento')", "category")
      .addSelect("COUNT(DISTINCT e.id)", "count")
      .groupBy("e.department")
      .getRawMany<{ category: string; count: string }>();

    const topEmployeesRows = await this.employeesRepo
      .createQueryBuilder("e")
      .leftJoin(TimeEntry, "te", "te.employee_id = e.id")
      .select("e.id", "id")
      .addSelect("CONCAT(e.first_name, ' ', e.last_name)", "name")
      .addSelect("COALESCE(SUM(te.hours), 0)", "hours")
      .groupBy("e.id")
      .addGroupBy("e.first_name")
      .addGroupBy("e.last_name")
      .orderBy("SUM(te.hours)", "DESC", "NULLS LAST")
      .limit(5)
      .getRawMany<{ id: number; name: string; hours: string }>();

    return {
      total,
      active,
      totalHours,
      avgHoursPerEmployee: total > 0 ? totalHours / total : 0,
      byDepartment: byDepartmentRows.map((r) => ({
        category: r.category,
        total: Number(r.count),
        count: Number(r.count),
      })),
      topEmployees: topEmployeesRows.map((r) => ({
        id: r.id,
        name: r.name,
        hours: Number(r.hours),
      })),
    };
  }

  private async groupCount(
    column: "status" | "priority",
  ): Promise<CategoryCount[]> {
    const rows = await this.projectsRepo
      .createQueryBuilder("p")
      .select(`p.${column}`, "category")
      .addSelect("COUNT(*)", "count")
      .groupBy(`p.${column}`)
      .getRawMany<{ category: string; count: string }>();
    return rows.map((r) => ({
      category: r.category,
      total: Number(r.count),
      count: Number(r.count),
    }));
  }
}
