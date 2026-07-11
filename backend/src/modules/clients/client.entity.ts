import { TIMESTAMP_TYPE } from "../../common/db-types.js";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  company: string | null;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  phone: string | null;

  @Column({ type: "text", nullable: true })
  address: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  city: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  country: string | null;

  @Column({ name: "tax_id", type: "varchar", length: 50, nullable: true })
  taxId: string | null;

  @Column({ type: "varchar", length: 20, default: "active" })
  status: string;

  @Column({ type: "text", nullable: true })
  notes: string | null;

  @CreateDateColumn({ name: "created_at", type: TIMESTAMP_TYPE })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: TIMESTAMP_TYPE })
  updatedAt: Date;
}
