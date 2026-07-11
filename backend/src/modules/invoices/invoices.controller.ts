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
import { QueryDocumentsDto } from "../../common/dto/query-documents.dto.js";
import { CreateInvoiceDto } from "./dto/create-invoice.dto.js";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto.js";
import { InvoicesService } from "./invoices.service.js";

@Controller("invoices")
export class InvoicesController {
  constructor(private readonly invoices: InvoicesService) {}

  @Get("stats")
  stats() {
    return this.invoices.stats();
  }

  @Get()
  list(@Query() query: QueryDocumentsDto) {
    return this.invoices.list(query);
  }

  @Post()
  create(@Body() dto: CreateInvoiceDto) {
    return this.invoices.create(dto);
  }

  @Get(":id")
  get(@Param("id", ParseIntPipe) id: number) {
    return this.invoices.findEntity(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateInvoiceDto) {
    return this.invoices.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.invoices.remove(id);
  }
}
