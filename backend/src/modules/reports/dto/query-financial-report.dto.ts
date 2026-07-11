import { IsDateString, IsOptional } from "class-validator";

export class QueryFinancialReportDto {
  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @IsOptional()
  @IsDateString()
  dateTo?: string;
}
