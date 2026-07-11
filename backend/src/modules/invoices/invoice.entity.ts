import { Column, Entity } from "typeorm";
import { DocumentEntity } from "../../common/entities/document.entity.js";
import { numericTransformer } from "../../common/transformers/numeric.transformer.js";

@Entity("invoices")
export class Invoice extends DocumentEntity {
  @Column({ name: "invoice_number", type: "varchar", length: 50, unique: true })
  invoiceNumber: string;

  @Column({ name: "quote_id", type: "int", nullable: true })
  quoteId: number | null;

  @Column({ name: "due_date", type: "date", nullable: true })
  dueDate: string | null;

  @Column({
    name: "paid_amount",
    type: "numeric",
    precision: 12,
    scale: 2,
    default: 0,
    transformer: numericTransformer,
  })
  paidAmount: number;
}
