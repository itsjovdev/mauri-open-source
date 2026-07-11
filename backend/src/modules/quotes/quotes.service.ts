import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DocumentsService } from "../../common/services/documents.service.js";
import { ActivityService } from "../activity/activity.service.js";
import { Invoice } from "../invoices/invoice.entity.js";
import { CreateQuoteDto } from "./dto/create-quote.dto.js";
import { UpdateQuoteDto } from "./dto/update-quote.dto.js";
import { Quote } from "./quote.entity.js";

@Injectable()
export class QuotesService extends DocumentsService<Quote> {
  constructor(
    @InjectRepository(Quote) repo: Repository<Quote>,
    @InjectRepository(Invoice)
    private readonly invoices: Repository<Invoice>,
    activity: ActivityService,
  ) {
    super(repo, activity, {
      label: "Quote",
      prefix: "PRES",
      numberColumn: "quoteNumber",
      activityType: "quote_created",
      activityEntity: "quote",
      activityNoun: "Presupuesto",
    });
  }

  create(dto: CreateQuoteDto): Promise<Quote> {
    return this.createDocument(dto);
  }

  update(id: number, dto: UpdateQuoteDto): Promise<Quote> {
    return this.updateDocument(id, dto);
  }


  async convert(id: number): Promise<Invoice> {
    const quote = await this.findEntity(id);
    const count = await this.invoices.count();
    const invoiceNumber = `FACT-${String(count + 1).padStart(4, "0")}`;

    const invoice = this.invoices.create({
      invoiceNumber,
      clientId: quote.clientId,
      projectId: quote.projectId,
      quoteId: quote.id,
      status: "draft",
      title: quote.title,
      notes: quote.notes,
      subtotal: quote.subtotal,
      discount: quote.discount,
      tax: quote.tax,
      total: quote.total,
      paidAmount: 0,
      items: quote.items,
    });
    const saved = await this.invoices.save(invoice);

    quote.status = "approved";
    await this.repo.save(quote);

    await this.activity.log(
      "invoice_created",
      `Factura ${invoiceNumber} creada desde presupuesto`,
      saved.id,
      "invoice",
    );

    return this.invoices.findOneOrFail({
      where: { id: saved.id },
      relations: { client: true },
    });
  }
}
