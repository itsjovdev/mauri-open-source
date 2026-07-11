import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, ILike, Repository } from "typeorm";
import {
  Paginated,
  paginated,
} from "../../common/dto/pagination-query.dto.js";
import { BaseCrudService } from "../../common/services/base-crud.service.js";
import { CreateEmployeeDto } from "./dto/create-employee.dto.js";
import { QueryEmployeesDto } from "./dto/query-employees.dto.js";
import { UpdateEmployeeDto } from "./dto/update-employee.dto.js";
import { Employee } from "./employee.entity.js";

@Injectable()
export class EmployeesService extends BaseCrudService<Employee> {
  constructor(
    @InjectRepository(Employee) repo: Repository<Employee>,
  ) {
    super(repo, "Employee");
  }

  async list(query: QueryEmployeesDto): Promise<Paginated<Employee>> {
    const base: FindOptionsWhere<Employee> = {};
    if (query.department) base.department = query.department;

    const where: FindOptionsWhere<Employee>[] = query.search
      ? [
          { ...base, firstName: ILike(`%${query.search}%`) },
          { ...base, lastName: ILike(`%${query.search}%`) },
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

  create(dto: CreateEmployeeDto): Promise<Employee> {
    return this.createEntity(dto);
  }

  update(id: number, dto: UpdateEmployeeDto): Promise<Employee> {
    return this.updateEntity(id, dto);
  }
}
