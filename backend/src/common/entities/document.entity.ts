import { Exclude, Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { numericTransformer } from "../transformers/numeric.transformer.js";
import { JSON_TYPE, TIMESTAMP_TYPE } from "../db-types.js";
import { Client } from "../../modules/clients/client.entity.js";
import type { LineItem } from "../utils/totals.js";


export abstract class DocumentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "client_id", type: "int", nullable: true })
  clientId: number | null;

  @Exclude()
  @ManyToOne(() => Client, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "client_id" })
  client?: Client | null;

  @Column({ name: "project_id", type: "int", nullable: true })
  projectId: number | null;

  @Column({ type: "varchar", length: 20, default: "draft" })
  status: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  title: string | null;

  @Column({ type: "text", nullable: true })
  notes: string | null;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    default: 0,
    transformer: numericTransformer,
  })
  subtotal: number;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    default: 0,
    transformer: numericTransformer,
  })
  discount: number;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    default: 0,
    transformer: numericTransformer,
  })
  tax: number;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    default: 0,
    transformer: numericTransformer,
  })
  total: number;

  @Column({ type: JSON_TYPE, nullable: true })
  items: LineItem[];

  @CreateDateColumn({ name: "created_at", type: TIMESTAMP_TYPE })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: TIMESTAMP_TYPE })
  updatedAt: Date;

  @Expose()
  get clientName(): string | null {
    return this.client?.name ?? null;
  }
}
