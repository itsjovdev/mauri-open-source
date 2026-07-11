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
import { CreateTimeEntryDto } from "./dto/create-time-entry.dto.js";
import { QueryTimeEntriesDto } from "./dto/query-time-entries.dto.js";
import { UpdateTimeEntryDto } from "./dto/update-time-entry.dto.js";
import { TimeEntriesService } from "./time-entries.service.js";

@Controller("time-entries")
export class TimeEntriesController {
  constructor(private readonly timeEntries: TimeEntriesService) {}

  @Get("summary")
  summary(@Query("period") period?: string) {
    return this.timeEntries.summary(period);
  }

  @Get()
  list(@Query() query: QueryTimeEntriesDto) {
    return this.timeEntries.list(query);
  }

  @Post()
  create(@Body() dto: CreateTimeEntryDto) {
    return this.timeEntries.create(dto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateTimeEntryDto,
  ) {
    return this.timeEntries.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.timeEntries.remove(id);
  }
}
