import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import {
  Paginated,
  paginated,
} from "../../common/dto/pagination-query.dto.js";
import { BaseCrudService } from "../../common/services/base-crud.service.js";
import { ActivityService } from "../activity/activity.service.js";
import { CreateProjectDto } from "./dto/create-project.dto.js";
import { QueryProjectsDto } from "./dto/query-projects.dto.js";
import { UpdateProjectDto } from "./dto/update-project.dto.js";
import { Project } from "./project.entity.js";

const STATUS_KEYS = [
  "planning",
  "active",
  "on_hold",
  "completed",
  "cancelled",
] as const;

@Injectable()
export class ProjectsService extends BaseCrudService<Project> {
  constructor(
    @InjectRepository(Project) repo: Repository<Project>,
    private readonly activity: ActivityService,
  ) {
    super(repo, "Project");
  }

  protected override relations(): string[] {
    return ["client"];
  }

  async list(query: QueryProjectsDto): Promise<Paginated<Project>> {
    const where: FindOptionsWhere<Project> = {};
    if (query.search) where.name = ILike(`%${query.search}%`);
    if (query.status) where.status = query.status;
    if (query.clientId) where.clientId = query.clientId;

    const [data, total] = await this.repo.findAndCount({
      where,
      relations: { client: true },
      order: { createdAt: "ASC" },
      skip: query.skip,
      take: query.limit,
    });
    return paginated(data, total, query);
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const project = await this.createEntity(dto);
    await this.activity.log(
      "project_created",
      `Proyecto "${project.name}" creado`,
      project.id,
      "project",
    );
    return project;
  }

  update(id: number, dto: UpdateProjectDto): Promise<Project> {
    return this.updateEntity(id, dto);
  }

  async stats() {
    const rows = await this.repo
      .createQueryBuilder("p")
      .select("p.status", "status")
      .addSelect("COUNT(*)", "count")
      .groupBy("p.status")
      .getRawMany<{ status: string; count: string }>();

    const stats: Record<string, number> = {
      planning: 0,
      active: 0,
      on_hold: 0,
      completed: 0,
      cancelled: 0,
      total: 0,
    };
    for (const row of rows) {
      const count = Number(row.count);
      if ((STATUS_KEYS as readonly string[]).includes(row.status)) {
        stats[row.status] = count;
      }
      stats.total += count;
    }
    return stats;
  }
}
