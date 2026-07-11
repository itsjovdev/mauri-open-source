import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import {
  Paginated,
  paginated,
} from "../../common/dto/pagination-query.dto.js";
import { BaseCrudService } from "../../common/services/base-crud.service.js";
import { dateRange } from "../../common/utils/date-range.js";
import { CreateTimeEntryDto } from "./dto/create-time-entry.dto.js";
import { QueryTimeEntriesDto } from "./dto/query-time-entries.dto.js";
import { UpdateTimeEntryDto } from "./dto/update-time-entry.dto.js";
import { TimeEntry } from "./time-entry.entity.js";

@Injectable()
export class TimeEntriesService extends BaseCrudService<TimeEntry> {
  constructor(@InjectRepository(TimeEntry) repo: Repository<TimeEntry>) {
    super(repo, "Time entry");
  }

  protected override relations(): string[] {
    return ["employee", "project"];
  }

  async list(query: QueryTimeEntriesDto): Promise<Paginated<TimeEntry>> {
    const where: FindOptionsWhere<TimeEntry> = {};
    if (query.employeeId) where.employeeId = query.employeeId;
    if (query.projectId) where.projectId = query.projectId;
    const range = dateRange(query.dateFrom, query.dateTo);
    if (range) where.date = range;

    const [data, total] = await this.repo.findAndCount({
      where,
      relations: { employee: true, project: true },
      order: { date: "DESC" },
      skip: query.skip,
      take: query.limit,
    });
    return paginated(data, total, query);
  }

  create(dto: CreateTimeEntryDto): Promise<TimeEntry> {
    return this.createEntity(dto);
  }

  update(id: number, dto: UpdateTimeEntryDto): Promise<TimeEntry> {
    return this.updateEntity(id, dto);
  }

  async summary(period = "week") {
    const since = this.periodStart(period);

    const totalRow = await this.repo
      .createQueryBuilder("te")
      .select("COALESCE(SUM(te.hours), 0)", "total")
      .where("te.date >= :since", { since })
      .getRawOne<{ total: string }>();

    const byProject = await this.repo
      .createQueryBuilder("te")
      .leftJoin("te.project", "p")
      .select("p.id", "id")
      .addSelect("p.name", "name")
      .addSelect("SUM(te.hours)", "hours")
      .where("te.date >= :since", { since })
      .andWhere("te.project_id IS NOT NULL")
      .groupBy("p.id")
      .addGroupBy("p.name")
      .orderBy("SUM(te.hours)", "DESC")
      .getRawMany<{ id: number; name: string; hours: string }>();

    const byEmployee = await this.repo
      .createQueryBuilder("te")
      .leftJoin("te.employee", "e")
      .select("e.id", "id")
      .addSelect("CONCAT(e.first_name, ' ', e.last_name)", "name")
      .addSelect("SUM(te.hours)", "hours")
      .where("te.date >= :since", { since })
      .groupBy("e.id")
      .addGroupBy("e.first_name")
      .addGroupBy("e.last_name")
      .orderBy("SUM(te.hours)", "DESC")
      .getRawMany<{ id: number; name: string; hours: string }>();

    return {
      totalHours: Number(totalRow?.total ?? 0),
      byProject: byProject.map((r) => ({ ...r, hours: Number(r.hours) })),
      byEmployee: byEmployee.map((r) => ({ ...r, hours: Number(r.hours) })),
    };
  }

  private periodStart(period: string): string {
    const now = new Date();
    let start: Date;
    if (period === "day") {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (period === "month") {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      const day = now.getDay();
      start = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - day + (day === 0 ? -6 : 1),
      );
    }
    return start.toISOString().slice(0, 10);
  }
}
