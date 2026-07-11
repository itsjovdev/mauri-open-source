import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";
import type { LineItem } from "../../../common/utils/totals.js";

export class CreateQuoteDto {
  @IsInt()
  clientId: number;

  @IsOptional()
  @IsInt()
  projectId?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDateString()
  validUntil?: string;

  @IsOptional()
  @IsArray()
  items?: LineItem[];
}
