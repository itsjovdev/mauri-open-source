import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, ILike, IsNull, Not, Repository } from "typeorm";
import {
  Paginated,
  paginated,
} from "../../common/dto/pagination-query.dto.js";
import { BaseCrudService } from "../../common/services/base-crud.service.js";
import { CreateTaskDto } from "./dto/create-task.dto.js";
import { QueryTasksDto } from "./dto/query-tasks.dto.js";
import { UpdateTaskDto } from "./dto/update-task.dto.js";
import { Task } from "./task.entity.js";

@Injectable()
export class TasksService extends BaseCrudService<Task> {
  constructor(@InjectRepository(Task) repo: Repository<Task>) {
    super(repo, "Task");
  }

  protected override relations(): string[] {
    return ["project", "assignee"];
  }

  async list(query: QueryTasksDto): Promise<Paginated<Task>> {
    const where: FindOptionsWhere<Task> = {};
    if (query.status) where.status = query.status;
    if (query.priority) where.priority = query.priority;
    if (query.projectId) where.projectId = query.projectId;
    if (query.assigneeId) where.assigneeId = query.assigneeId;
    if (query.search) where.title = ILike(`%${query.search}%`);

    const [data, total] = await this.repo.findAndCount({
      where,
      relations: { project: true, assignee: true },
      order: { createdAt: "ASC" },
      skip: query.skip,
      take: query.limit,
    });
    return paginated(data, total, query);
  }

  create(dto: CreateTaskDto): Promise<Task> {
    return this.createEntity(dto);
  }

  update(id: number, dto: UpdateTaskDto): Promise<Task> {
    return this.updateEntity(id, dto);
  }


  upcoming(limit = 10): Promise<Task[]> {
    return this.repo.find({
      where: { status: Not("done"), dueDate: Not(IsNull()) },
      relations: { project: true, assignee: true },
      order: { dueDate: "ASC" },
      take: limit,
    });
  }
}
