import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DocumentsService } from "../../common/services/documents.service.js";
import { ActivityService } from "../activity/activity.service.js";
import { CreateInvoiceDto } from "./dto/create-invoice.dto.js";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto.js";
import { Invoice } from "./invoice.entity.js";

@Injectable()
export class InvoicesService extends DocumentsService<Invoice> {
  constructor(
    @InjectRepository(Invoice) repo: Repository<Invoice>,
    activity: ActivityService,
  ) {
    super(repo, activity, {
      label: "Invoice",
      prefix: "FACT",
      numberColumn: "invoiceNumber",
      activityType: "invoice_created",
      activityEntity: "invoice",
      activityNoun: "Factura",
    });
  }

  create(dto: CreateInvoiceDto): Promise<Invoice> {
    return this.createDocument(dto);
  }

  update(id: number, dto: UpdateInvoiceDto): Promise<Invoice> {
    return this.updateDocument(id, dto);
  }

  async stats() {
    const rows = await this.repo
      .createQueryBuilder("i")
      .select("i.status", "status")
      .addSelect("COALESCE(SUM(i.total), 0)", "total")
      .addSelect("COUNT(*)", "count")
      .groupBy("i.status")
      .getRawMany<{ status: string; total: string; count: string }>();

    const stats = {
      totalPaid: 0,
      totalPending: 0,
      totalOverdue: 0,
      totalDraft: 0,
      countPaid: 0,
      countPending: 0,
      countOverdue: 0,
    };
    for (const row of rows) {
      const total = Number(row.total);
      const count = Number(row.count);
      if (row.status === "paid") {
        stats.totalPaid = total;
        stats.countPaid = count;
      }
      if (row.status === "pending" || row.status === "sent") {
        stats.totalPending += total;
        stats.countPending += count;
      }
      if (row.status === "draft") stats.totalDraft += total;
    }
    return stats;
  }
}
