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
import { Employee } from "../employees/employee.entity.js";
import { Project } from "../projects/project.entity.js";

@Entity("time_entries")
export class TimeEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "employee_id", type: "int" })
  employeeId: number;

  @Exclude()
  @ManyToOne(() => Employee, { onDelete: "CASCADE" })
  @JoinColumn({ name: "employee_id" })
  employee?: Employee;

  @Column({ name: "project_id", type: "int", nullable: true })
  projectId: number | null;

  @Exclude()
  @ManyToOne(() => Project, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "project_id" })
  project?: Project | null;

  @Column({ name: "task_id", type: "int", nullable: true })
  taskId: number | null;

  @Column({ type: "text", nullable: true })
  description: string | null;

  @Column({ type: "date" })
  date: string;

  @Column({
    type: "numeric",
    precision: 6,
    scale: 2,
    transformer: numericTransformer,
  })
  hours: number;

  @CreateDateColumn({ name: "created_at", type: TIMESTAMP_TYPE })
  createdAt: Date;

  @Expose()
  get employeeName(): string | null {
    return this.employee
      ? `${this.employee.firstName} ${this.employee.lastName}`
      : null;
  }

  @Expose()
  get projectName(): string | null {
    return this.project?.name ?? null;
  }
}
