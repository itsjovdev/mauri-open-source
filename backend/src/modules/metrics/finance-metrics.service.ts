import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Expense } from "../expenses/expense.entity.js";
import { Invoice } from "../invoices/invoice.entity.js";

export interface MonthlyPoint {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}


@Injectable()
export class FinanceMetricsService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoices: Repository<Invoice>,
    @InjectRepository(Expense)
    private readonly expenses: Repository<Expense>,
  ) {}


  async paidRevenue(from: string, to?: string): Promise<number> {
    const qb = this.invoices
      .createQueryBuilder("i")
      .select("COALESCE(SUM(i.total), 0)", "value")
      .where("i.status = :status", { status: "paid" })
      .andWhere("i.created_at >= :from", { from });
    if (to) qb.andWhere("i.created_at <= :to", { to });
    const row = await qb.getRawOne<{ value: string }>();
    return Number(row?.value ?? 0);
  }


  async totalExpenses(from: string, to?: string): Promise<number> {
    const qb = this.expenses
      .createQueryBuilder("e")
      .select("COALESCE(SUM(e.amount), 0)", "value")
      .where("e.date >= :from", { from });
    if (to) qb.andWhere("e.date <= :to", { to });
    const row = await qb.getRawOne<{ value: string }>();
    return Number(row?.value ?? 0);
  }

  async range(from: string, to: string) {
    const revenue = await this.paidRevenue(from, `${to}T23:59:59`);
    const expenses = await this.totalExpenses(from, to);
    return { revenue, expenses, profit: revenue - expenses };
  }


  async lastMonths(count: number): Promise<MonthlyPoint[]> {
    const now = new Date();
    const points: MonthlyPoint[] = [];
    for (let i = count - 1; i >= 0; i--) {
      points.push(
        await this.month(now.getFullYear(), now.getMonth() - i),
      );
    }
    return points;
  }


  async monthsBetween(from: string, to: string): Promise<MonthlyPoint[]> {
    const start = new Date(from);
    const end = new Date(to);
    const total =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1;
    const points: MonthlyPoint[] = [];
    for (let i = 0; i < Math.min(total, 12); i++) {
      points.push(await this.month(start.getFullYear(), start.getMonth() + i));
    }
    return points;
  }

  private async month(year: number, monthIndex: number): Promise<MonthlyPoint> {
    const date = new Date(year, monthIndex, 1);
    const startDate = date.toISOString().slice(0, 10);
    const endDate = new Date(year, monthIndex + 1, 0).toISOString().slice(0, 10);
    const revenue = await this.paidRevenue(startDate, `${endDate}T23:59:59`);
    const expenses = await this.totalExpenses(startDate, endDate);
    return {
      month: date.toLocaleString("es-ES", { month: "short", year: "2-digit" }),
      revenue,
      expenses,
      profit: revenue - expenses,
    };
  }
}
