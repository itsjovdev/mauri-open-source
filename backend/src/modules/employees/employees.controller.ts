import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto.js";
import { QueryEmployeesDto } from "./dto/query-employees.dto.js";
import { UpdateEmployeeDto } from "./dto/update-employee.dto.js";
import { EmployeesService } from "./employees.service.js";

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employees: EmployeesService) {}

  @Get()
  list(@Query() query: QueryEmployeesDto) {
    return this.employees.list(query);
  }

  @Post()
  create(@Body() dto: CreateEmployeeDto) {
    return this.employees.create(dto);
  }

  @Get(":id")
  get(@Param("id", ParseIntPipe) id: number) {
    return this.employees.findEntity(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateEmployeeDto) {
    return this.employees.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.employees.remove(id);
  }
}
