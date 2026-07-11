import { IsOptional, IsString } from "class-validator";
import { PaginationQueryDto } from "../../../common/dto/pagination-query.dto.js";

export class QueryEmployeesDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  department?: string;
}
