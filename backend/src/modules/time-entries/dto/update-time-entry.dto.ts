import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateTimeEntryDto } from "./create-time-entry.dto.js";
export class UpdateTimeEntryDto extends PartialType(
  OmitType(CreateTimeEntryDto, ["employeeId"] as const),
) {}
