import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { BaseCrudService } from "../../common/services/base-crud.service.js";
import {
  Paginated,
  paginated,
} from "../../common/dto/pagination-query.dto.js";
import { ActivityService } from "../activity/activity.service.js";
import { Invoice } from "../invoices/invoice.entity.js";
import { Project } from "../projects/project.entity.js";
import { Client } from "./client.entity.js";
import { CreateClientDto } from "./dto/create-client.dto.js";
import { QueryClientsDto } from "./dto/query-clients.dto.js";
import { UpdateClientDto } from "./dto/update-client.dto.js";

@Injectable()
export class ClientsService extends BaseCrudService<Client> {
  constructor(
    @InjectRepository(Client) repo: Repository<Client>,
    @InjectRepository(Project)
    private readonly projects: Repository<Project>,
    @InjectRepository(Invoice)
    private readonly invoices: Repository<Invoice>,
    private readonly activity: ActivityService,
  ) {
    super(repo, "Client");
  }

  async list(query: QueryClientsDto): Promise<Paginated<Client>> {
    const base: FindOptionsWhere<Client> = {};
    if (query.status) base.status = query.status;

    const where: FindOptionsWhere<Client>[] = query.search
      ? [
          { ...base, name: ILike(`%${query.search}%`) },
          { ...base, company: ILike(`%${query.search}%`) },
          { ...base, email: ILike(`%${query.search}%`) },
        ]
      : [base];

    const [data, total] = await this.repo.findAndCount({
      where,
      order: { createdAt: "ASC" },
      skip: query.skip,
      take: query.limit,
    });
    return paginated(data, total, query);
  }

  async create(dto: CreateClientDto): Promise<Client> {
    const client = await this.createEntity(dto);
    await this.activity.log(
      "client_created",
      `Cliente "${client.name}" creado`,
      client.id,
      "client",
    );
    return client;
  }

  update(id: number, dto: UpdateClientDto): Promise<Client> {
    return this.updateEntity(id, dto);
  }

  clientProjects(id: number): Promise<Project[]> {
    return this.projects.find({
      where: { clientId: id },
      relations: { client: true },
    });
  }

  clientInvoices(id: number): Promise<Invoice[]> {
    return this.invoices.find({
      where: { clientId: id },
      relations: { client: true },
    });
  }
}
