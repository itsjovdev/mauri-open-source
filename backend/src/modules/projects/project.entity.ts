import { TIMESTAMP_TYPE } from "../../common/db-types.js";
import { Exclude, Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { numericTransformer } from "../../common/transformers/numeric.transformer.js";
import { Client } from "../clients/client.entity.js";

@Entity("projects")
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ name: "client_id", type: "int", nullable: true })
  clientId: number | null;

  @Exclude()
  @ManyToOne(() => Client, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "client_id" })
  client?: Client | null;

  @Column({ type: "varchar", length: 30, default: "planning" })
  status: string;

  @Column({ type: "varchar", length: 20, default: "medium" })
  priority: string;

  @Column({ type: "int", default: 0 })
  progress: number;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    nullable: true,
    transformer: numericTransformer,
  })
  budget: number | null;

  @Column({ type: TIMESTAMP_TYPE, nullable: true })
  deadline: Date | null;

  @Column({ name: "start_date", type: TIMESTAMP_TYPE, nullable: true })
  startDate: Date | null;

  @CreateDateColumn({ name: "created_at", type: TIMESTAMP_TYPE })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: TIMESTAMP_TYPE })
  updatedAt: Date;

  @Expose()
  get clientName(): string | null {
    return this.client?.name ?? null;
  }
}
