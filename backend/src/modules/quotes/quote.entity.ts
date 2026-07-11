import { Column, Entity } from "typeorm";
import { DocumentEntity } from "../../common/entities/document.entity.js";

@Entity("quotes")
export class Quote extends DocumentEntity {
  @Column({ name: "quote_number", type: "varchar", length: 50, unique: true })
  quoteNumber: string;

  @Column({ name: "valid_until", type: "date", nullable: true })
  validUntil: string | null;
}
