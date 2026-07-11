import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ActivityLog } from "./activity-log.entity.js";

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityLog)
    private readonly repo: Repository<ActivityLog>,
  ) {}


  async log(
    type: string,
    description: string,
    entityId: number | null | undefined,
    entityType: string,
  ): Promise<void> {
    await this.repo.insert({
      type,
      description,
      entityId: entityId ?? null,
      entityType,
    });
  }

  recent(limit = 15): Promise<ActivityLog[]> {
    return this.repo.find({ order: { createdAt: "DESC" }, take: limit });
  }
}
