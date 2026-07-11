import "reflect-metadata";
import "dotenv/config";
import { ClassSerializerInterceptor, Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DataSource } from "typeorm";
import { AppModule } from "./app.module.js";
import { IS_MEMORY_DB } from "./common/db-types.js";
import { seedAll } from "./database/seed.js";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix("api");
  await app.register(import("@fastify/cors"));
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  if (IS_MEMORY_DB) {
    await seedAll(app.get(DataSource));
    Logger.log("BD en memoria (sql.js) con datos de prueba cargados", "Bootstrap");
  }

  const rawPort = process.env.PORT ?? "8080";
  const port = Number(rawPort);
  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid PORT value: "${rawPort}"`);
  }

  await app.listen(port, "0.0.0.0");
}

void bootstrap();
