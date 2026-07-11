import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Expense } from "../expenses/expense.entity.js";
import { Invoice } from "../invoices/invoice.entity.js";
import { FinanceMetricsService } from "./finance-metrics.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, Expense])],
  providers: [FinanceMetricsService],
  exports: [FinanceMetricsService],
})
export class MetricsModule {}
