import { TIMESTAMP_TYPE } from "../../common/db-types.js";
import { Exclude, Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { numericTransformer } from "../../common/transformers/numeric.transformer.js";
import { Project } from "../projects/project.entity.js";

@Entity("expenses")
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    transformer: numericTransformer,
  })
  amount: number;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "varchar", length: 100 })
  category: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  supplier: string | null;

  @Column({ type: "text", nullable: true })
  notes: string | null;

  @Column({ name: "project_id", type: "int", nullable: true })
  projectId: number | null;

  @Exclude()
  @ManyToOne(() => Project, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "project_id" })
  project?: Project | null;

  @CreateDateColumn({ name: "created_at", type: TIMESTAMP_TYPE })
  createdAt: Date;

  @Expose()
  get projectName(): string | null {
    return this.project?.name ?? null;
  }
}
