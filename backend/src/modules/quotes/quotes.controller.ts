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
import { CreateQuoteDto } from "./dto/create-quote.dto.js";
import { UpdateQuoteDto } from "./dto/update-quote.dto.js";
import { QuotesService } from "./quotes.service.js";

@Controller("quotes")
export class QuotesController {
  constructor(private readonly quotes: QuotesService) {}

  @Get()
  list(@Query() query: QueryDocumentsDto) {
    return this.quotes.list(query);
  }

  @Post()
  create(@Body() dto: CreateQuoteDto) {
    return this.quotes.create(dto);
  }

  @Get(":id")
  get(@Param("id", ParseIntPipe) id: number) {
    return this.quotes.findEntity(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateQuoteDto) {
    return this.quotes.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.quotes.remove(id);
  }

  @Post(":id/convert")
  convert(@Param("id", ParseIntPipe) id: number) {
    return this.quotes.convert(id);
  }
}
