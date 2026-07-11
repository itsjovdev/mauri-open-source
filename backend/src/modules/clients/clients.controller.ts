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
import { ClientsService } from "./clients.service.js";
import { CreateClientDto } from "./dto/create-client.dto.js";
import { QueryClientsDto } from "./dto/query-clients.dto.js";
import { UpdateClientDto } from "./dto/update-client.dto.js";

@Controller("clients")
export class ClientsController {
  constructor(private readonly clients: ClientsService) {}

  @Get()
  list(@Query() query: QueryClientsDto) {
    return this.clients.list(query);
  }

  @Post()
  create(@Body() dto: CreateClientDto) {
    return this.clients.create(dto);
  }

  @Get(":id")
  get(@Param("id", ParseIntPipe) id: number) {
    return this.clients.findEntity(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateClientDto) {
    return this.clients.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.clients.remove(id);
  }

  @Get(":id/projects")
  projects(@Param("id", ParseIntPipe) id: number) {
    return this.clients.clientProjects(id);
  }

  @Get(":id/invoices")
  invoices(@Param("id", ParseIntPipe) id: number) {
    return this.clients.clientInvoices(id);
  }
}
