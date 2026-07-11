import { TIMESTAMP_TYPE } from "../../common/db-types.js";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("activity_log")
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  type: string;

  @Column({ type: "text" })
  description: string;

  @Column({ name: "entity_id", type: "int", nullable: true })
  entityId: number | null;

  @Column({ name: "entity_type", type: "varchar", length: 50, nullable: true })
  entityType: string | null;

  @CreateDateColumn({ name: "created_at", type: TIMESTAMP_TYPE })
  createdAt: Date;
}
