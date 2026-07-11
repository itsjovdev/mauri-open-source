import type { ColumnType } from "typeorm";


export const IS_MEMORY_DB =
  process.env.DB_DRIVER === "memory" || !process.env.DATABASE_URL;

export const TIMESTAMP_TYPE: ColumnType = IS_MEMORY_DB
  ? "datetime"
  : "timestamp";

export const JSON_TYPE: ColumnType = IS_MEMORY_DB ? "simple-json" : "jsonb";
