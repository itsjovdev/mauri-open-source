import { TIMESTAMP_TYPE } from "../../common/db-types.js";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("employees")
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "first_name", type: "varchar", length: 100 })
  firstName: string;

  @Column({ name: "last_name", type: "varchar", length: 100 })
  lastName: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  phone: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  department: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  position: string | null;

  @Column({ type: "varchar", length: 20, default: "active" })
  status: string;

  @Column({ name: "hire_date", type: TIMESTAMP_TYPE, nullable: true })
  hireDate: Date | null;

  @CreateDateColumn({ name: "created_at", type: TIMESTAMP_TYPE })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: TIMESTAMP_TYPE })
  updatedAt: Date;
}
