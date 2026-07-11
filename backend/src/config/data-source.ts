import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { dataSourceOptions } from "./typeorm.options.js";


export default new DataSource(dataSourceOptions());
