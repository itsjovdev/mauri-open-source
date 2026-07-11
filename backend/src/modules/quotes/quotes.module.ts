import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActivityModule } from "../activity/activity.module.js";
import { Invoice } from "../invoices/invoice.entity.js";
import { QuotesController } from "./quotes.controller.js";
import { QuotesService } from "./quotes.service.js";
import { Quote } from "./quote.entity.js";

@Module({
  imports: [TypeOrmModule.forFeature([Quote, Invoice]), ActivityModule],
  controllers: [QuotesController],
  providers: [QuotesService],
  exports: [QuotesService],
})
export class QuotesModule {}
