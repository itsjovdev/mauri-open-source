import { NotFoundException } from "@nestjs/common";
import type {
  DeepPartial,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from "typeorm";


export abstract class BaseCrudService<T extends ObjectLiteral & { id: number }> {
  protected constructor(
    protected readonly repo: Repository<T>,
    protected readonly label: string,
  ) {}

  protected relations(): string[] {
    return [];
  }

  async findEntity(id: number): Promise<T> {
    const entity = await this.repo.findOne({
      where: { id } as FindOptionsWhere<T>,
      relations: this.relations(),
    });
    if (!entity) throw new NotFoundException(`${this.label} not found`);
    return entity;
  }

  async createEntity(data: DeepPartial<T>): Promise<T> {
    const entity = this.repo.create(data);
    const saved = await this.repo.save(entity);
    return this.findEntity(saved.id);
  }

  async updateEntity(id: number, data: DeepPartial<T>): Promise<T> {
    const entity = await this.findEntity(id);
    Object.assign(entity, data);
    await this.repo.save(entity);
    return this.findEntity(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
