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
import { Employee } from "../employees/employee.entity.js";
import { Project } from "../projects/project.entity.js";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ name: "project_id", type: "int", nullable: true })
  projectId: number | null;

  @Exclude()
  @ManyToOne(() => Project, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "project_id" })
  project?: Project | null;

  @Column({ name: "assignee_id", type: "int", nullable: true })
  assigneeId: number | null;

  @Exclude()
  @ManyToOne(() => Employee, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "assignee_id" })
  assignee?: Employee | null;

  @Column({ type: "varchar", length: 30, default: "todo" })
  status: string;

  @Column({ type: "varchar", length: 20, default: "medium" })
  priority: string;

  @Column({ name: "due_date", type: TIMESTAMP_TYPE, nullable: true })
  dueDate: Date | null;

  @Column({
    name: "estimated_hours",
    type: "numeric",
    precision: 6,
    scale: 2,
    nullable: true,
    transformer: numericTransformer,
  })
  estimatedHours: number | null;

  @CreateDateColumn({ name: "created_at", type: TIMESTAMP_TYPE })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: TIMESTAMP_TYPE })
  updatedAt: Date;

  @Expose()
  get projectName(): string | null {
    return this.project?.name ?? null;
  }

  @Expose()
  get assigneeName(): string | null {
    return this.assignee
      ? `${this.assignee.firstName} ${this.assignee.lastName}`
      : null;
  }
}
