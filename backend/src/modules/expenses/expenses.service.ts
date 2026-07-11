import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import {
  Paginated,
  paginated,
} from "../../common/dto/pagination-query.dto.js";
import { BaseCrudService } from "../../common/services/base-crud.service.js";
import { dateRange } from "../../common/utils/date-range.js";
import { CreateExpenseDto } from "./dto/create-expense.dto.js";
import { QueryExpensesDto } from "./dto/query-expenses.dto.js";
import { UpdateExpenseDto } from "./dto/update-expense.dto.js";
import { Expense } from "./expense.entity.js";

@Injectable()
export class ExpensesService extends BaseCrudService<Expense> {
  constructor(@InjectRepository(Expense) repo: Repository<Expense>) {
    super(repo, "Expense");
  }

  protected override relations(): string[] {
    return ["project"];
  }

  async list(query: QueryExpensesDto): Promise<Paginated<Expense>> {
    const where: FindOptionsWhere<Expense> = {};
    if (query.search) where.description = ILike(`%${query.search}%`);
    if (query.category) where.category = query.category;
    const range = dateRange(query.dateFrom, query.dateTo);
    if (range) where.date = range;

    const [data, total] = await this.repo.findAndCount({
      where,
      relations: { project: true },
      order: { date: "DESC" },
      skip: query.skip,
      take: query.limit,
    });
    return paginated(data, total, query);
  }

  create(dto: CreateExpenseDto): Promise<Expense> {
    return this.createEntity(dto);
  }

  update(id: number, dto: UpdateExpenseDto): Promise<Expense> {
    return this.updateEntity(id, dto);
  }

  async stats() {
    const rows = await this.repo
      .createQueryBuilder("e")
      .select("e.category", "category")
      .addSelect("COALESCE(SUM(e.amount), 0)", "total")
      .addSelect("COUNT(*)", "count")
      .groupBy("e.category")
      .orderBy("SUM(e.amount)", "DESC")
      .getRawMany<{ category: string; total: string; count: string }>();

    return rows.map((row) => ({
      category: row.category,
      total: Number(row.total),
      count: Number(row.count),
    }));
  }
}
