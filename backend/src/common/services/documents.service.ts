import type { DeepPartial, Repository } from "typeorm";
import { ILike } from "typeorm";
import type { DocumentEntity } from "../entities/document.entity.js";
import { computeTotals, LineItem } from "../utils/totals.js";
import { ActivityService } from "../../modules/activity/activity.service.js";
import {
  Paginated,
  paginated,
} from "../dto/pagination-query.dto.js";
import { QueryDocumentsDto } from "../dto/query-documents.dto.js";
import { BaseCrudService } from "./base-crud.service.js";

export interface DocumentConfig {

  label: string;

  prefix: string;

  numberColumn: "quoteNumber" | "invoiceNumber";

  activityType: string;
  activityEntity: string;
  activityNoun: string;
}


export abstract class DocumentsService<
  E extends DocumentEntity,
> extends BaseCrudService<E> {
  protected constructor(
    repo: Repository<E>,
    protected readonly activity: ActivityService,
    protected readonly config: DocumentConfig,
  ) {
    super(repo, config.label);
  }

  protected override relations(): string[] {
    return ["client"];
  }

  async list(query: QueryDocumentsDto): Promise<Paginated<E>> {
    const where: Record<string, unknown> = {};
    if (query.search) where[this.config.numberColumn] = ILike(`%${query.search}%`);
    if (query.status) where.status = query.status;
    if (query.clientId) where.clientId = query.clientId;

    const [data, total] = await this.repo.findAndCount({
      where: where as never,
      relations: { client: true } as never,
      order: { createdAt: "DESC" } as never,
      skip: query.skip,
      take: query.limit,
    });
    return paginated(data, total, query);
  }

  protected async createDocument(data: DeepPartial<E>): Promise<E> {
    const items = ((data as { items?: LineItem[] }).items ?? []) as LineItem[];
    const totals = computeTotals(items);
    const number = await this.nextNumber();

    const document = await this.createEntity({
      ...data,
      [this.config.numberColumn]: number,
      subtotal: totals.subtotal,
      discount: totals.discount,
      tax: totals.tax,
      total: totals.total,
      items,
    } as DeepPartial<E>);

    await this.activity.log(
      this.config.activityType,
      `${this.config.activityNoun} ${number} creada`,
      document.id,
      this.config.activityEntity,
    );
    return document;
  }

  protected async updateDocument(id: number, data: DeepPartial<E>): Promise<E> {
    const patch: Record<string, unknown> = { ...(data as object) };
    const items = (data as { items?: LineItem[] }).items;
    if (items !== undefined) {
      const totals = computeTotals(items);
      patch.subtotal = totals.subtotal;
      patch.discount = totals.discount;
      patch.tax = totals.tax;
      patch.total = totals.total;
    }
    return this.updateEntity(id, patch as DeepPartial<E>);
  }

  protected async nextNumber(): Promise<string> {
    const count = await this.repo.count();
    return `${this.config.prefix}-${String(count + 1).padStart(4, "0")}`;
  }
}
