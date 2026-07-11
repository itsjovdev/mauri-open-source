import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActivityModule } from "../activity/activity.module.js";
import { Invoice } from "../invoices/invoice.entity.js";
import { Project } from "../projects/project.entity.js";
import { Client } from "./client.entity.js";
import { ClientsController } from "./clients.controller.js";
import { ClientsService } from "./clients.service.js";

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Project, Invoice]),
    ActivityModule,
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
