import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ActivityService } from "../activity/activity.service.js";
import { Client } from "../clients/client.entity.js";
import { Invoice } from "../invoices/invoice.entity.js";
import { FinanceMetricsService } from "../metrics/finance-metrics.service.js";
import { Project } from "../projects/project.entity.js";
import { TasksService } from "../tasks/tasks.service.js";
import { TimeEntry } from "../time-entries/time-entry.entity.js";

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Client) private readonly clients: Repository<Client>,
    @InjectRepository(Project) private readonly projects: Repository<Project>,
    @InjectRepository(Invoice) private readonly invoices: Repository<Invoice>,
    @InjectRepository(TimeEntry)
    private readonly timeEntries: Repository<TimeEntry>,
    private readonly metrics: FinanceMetricsService,
    private readonly tasks: TasksService,
    private readonly activity: ActivityService,
  ) {}

  async summary() {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .slice(0, 10);
    const yearStart = new Date(now.getFullYear(), 0, 1)
      .toISOString()
      .slice(0, 10);

    const [
      activeClients,
      activeProjects,
      monthlyRevenue,
      pendingInvoices,
      pendingInvoicesAmount,
      registeredHours,
      totalIncome,
      totalExpenses,
    ] = await Promise.all([
      this.clients.count({ where: { status: "active" } }),
      this.projects.count({ where: { status: "active" } }),
      this.metrics.paidRevenue(monthStart),
      this.invoices.count({ where: { status: "pending" } }),
      this.sumPendingBalance(),
      this.sumHoursSince(monthStart),
      this.metrics.paidRevenue(yearStart),
      this.metrics.totalExpenses(yearStart),
    ]);

    return {
      activeClients,
      activeProjects,
      monthlyRevenue,
      pendingInvoices,
      pendingInvoicesAmount,
      registeredHours,
      totalIncome,
      totalExpenses,
      profit: totalIncome - totalExpenses,
    };
  }

  revenueChart(monthsQuery?: string) {
    const months = Math.min(
      12,
      Math.max(1, Number.parseInt(monthsQuery ?? "6", 10) || 6),
    );
    return this.metrics.lastMonths(months);
  }

  recentActivity() {
    return this.activity.recent(15);
  }

  upcomingTasks() {
    return this.tasks.upcoming(10);
  }

  private async sumPendingBalance(): Promise<number> {
    const row = await this.invoices
      .createQueryBuilder("i")
      .select("COALESCE(SUM(i.total - i.paid_amount), 0)", "value")
      .where("i.status = :status", { status: "pending" })
      .getRawOne<{ value: string }>();
    return Number(row?.value ?? 0);
  }

  private async sumHoursSince(since: string): Promise<number> {
    const row = await this.timeEntries
      .createQueryBuilder("te")
      .select("COALESCE(SUM(te.hours), 0)", "value")
      .where("te.date >= :since", { since })
      .getRawOne<{ value: string }>();
    return Number(row?.value ?? 0);
  }
}
