import {
  Between,
  FindOperator,
  LessThanOrEqual,
  MoreThanOrEqual,
} from "typeorm";


export function dateRange(
  from?: string,
  to?: string,
): FindOperator<string> | undefined {
  if (from && to) return Between(from, to);
  if (from) return MoreThanOrEqual(from);
  if (to) return LessThanOrEqual(to);
  return undefined;
}
