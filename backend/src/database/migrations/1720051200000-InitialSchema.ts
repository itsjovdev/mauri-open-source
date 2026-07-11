import type { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1720051200000 implements MigrationInterface {
  name = "InitialSchema1720051200000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table "clients" (
        "id" serial primary key,
        "name" varchar(255) not null,
        "company" varchar(255),
        "email" varchar(255) not null,
        "phone" varchar(50),
        "address" text,
        "city" varchar(100),
        "country" varchar(100),
        "tax_id" varchar(50),
        "status" varchar(20) not null default 'active',
        "notes" text,
        "created_at" timestamp not null default now(),
        "updated_at" timestamp not null default now()
      )
    `);

    await queryRunner.query(`
      create table "employees" (
        "id" serial primary key,
        "first_name" varchar(100) not null,
        "last_name" varchar(100) not null,
        "email" varchar(255) not null,
        "phone" varchar(50),
        "department" varchar(100),
        "position" varchar(100),
        "status" varchar(20) not null default 'active',
        "hire_date" timestamp,
        "created_at" timestamp not null default now(),
        "updated_at" timestamp not null default now(),
        constraint "uq_employees_email" unique ("email")
      )
    `);

    await queryRunner.query(`
      create table "projects" (
        "id" serial primary key,
        "name" varchar(255) not null,
        "description" text,
        "client_id" integer,
        "status" varchar(30) not null default 'planning',
        "priority" varchar(20) not null default 'medium',
        "progress" integer not null default 0,
        "budget" numeric(12, 2),
        "deadline" timestamp,
        "start_date" timestamp,
        "created_at" timestamp not null default now(),
        "updated_at" timestamp not null default now(),
        constraint "fk_projects_client" foreign key ("client_id")
          references "clients" ("id") on delete set null
      )
    `);

    await queryRunner.query(`
      create table "tasks" (
        "id" serial primary key,
        "title" varchar(255) not null,
        "description" text,
        "project_id" integer,
        "assignee_id" integer,
        "status" varchar(30) not null default 'todo',
        "priority" varchar(20) not null default 'medium',
        "due_date" timestamp,
        "estimated_hours" numeric(6, 2),
        "created_at" timestamp not null default now(),
        "updated_at" timestamp not null default now(),
        constraint "fk_tasks_project" foreign key ("project_id")
          references "projects" ("id") on delete set null,
        constraint "fk_tasks_assignee" foreign key ("assignee_id")
          references "employees" ("id") on delete set null
      )
    `);

    await queryRunner.query(`
      create table "quotes" (
        "id" serial primary key,
        "quote_number" varchar(50) not null,
        "client_id" integer,
        "project_id" integer,
        "status" varchar(20) not null default 'draft',
        "title" varchar(255),
        "notes" text,
        "valid_until" date,
        "subtotal" numeric(12, 2) not null default 0,
        "discount" numeric(12, 2) not null default 0,
        "tax" numeric(12, 2) not null default 0,
        "total" numeric(12, 2) not null default 0,
        "items" jsonb default '[]'::jsonb,
        "created_at" timestamp not null default now(),
        "updated_at" timestamp not null default now(),
        constraint "uq_quotes_number" unique ("quote_number"),
        constraint "fk_quotes_client" foreign key ("client_id")
          references "clients" ("id") on delete set null
      )
    `);

    await queryRunner.query(`
      create table "invoices" (
        "id" serial primary key,
        "invoice_number" varchar(50) not null,
        "client_id" integer,
        "project_id" integer,
        "quote_id" integer,
        "status" varchar(20) not null default 'draft',
        "title" varchar(255),
        "notes" text,
        "due_date" date,
        "subtotal" numeric(12, 2) not null default 0,
        "discount" numeric(12, 2) not null default 0,
        "tax" numeric(12, 2) not null default 0,
        "total" numeric(12, 2) not null default 0,
        "paid_amount" numeric(12, 2) not null default 0,
        "items" jsonb default '[]'::jsonb,
        "created_at" timestamp not null default now(),
        "updated_at" timestamp not null default now(),
        constraint "uq_invoices_number" unique ("invoice_number"),
        constraint "fk_invoices_client" foreign key ("client_id")
          references "clients" ("id") on delete set null
      )
    `);

    await queryRunner.query(`
      create table "expenses" (
        "id" serial primary key,
        "description" varchar(255) not null,
        "amount" numeric(12, 2) not null,
        "date" date not null,
        "category" varchar(100) not null,
        "supplier" varchar(255),
        "notes" text,
        "project_id" integer,
        "created_at" timestamp not null default now(),
        constraint "fk_expenses_project" foreign key ("project_id")
          references "projects" ("id") on delete set null
      )
    `);

    await queryRunner.query(`
      create table "time_entries" (
        "id" serial primary key,
        "employee_id" integer not null,
        "project_id" integer,
        "task_id" integer,
        "description" text,
        "date" date not null,
        "hours" numeric(6, 2) not null,
        "created_at" timestamp not null default now(),
        constraint "fk_time_entries_employee" foreign key ("employee_id")
          references "employees" ("id") on delete cascade,
        constraint "fk_time_entries_project" foreign key ("project_id")
          references "projects" ("id") on delete set null,
        constraint "fk_time_entries_task" foreign key ("task_id")
          references "tasks" ("id") on delete set null
      )
    `);

    await queryRunner.query(`
      create table "activity_log" (
        "id" serial primary key,
        "type" varchar(50) not null,
        "description" text not null,
        "entity_id" integer,
        "entity_type" varchar(50),
        "created_at" timestamp not null default now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table "activity_log"`);
    await queryRunner.query(`drop table "time_entries"`);
    await queryRunner.query(`drop table "expenses"`);
    await queryRunner.query(`drop table "invoices"`);
    await queryRunner.query(`drop table "quotes"`);
    await queryRunner.query(`drop table "tasks"`);
    await queryRunner.query(`drop table "projects"`);
    await queryRunner.query(`drop table "employees"`);
    await queryRunner.query(`drop table "clients"`);
  }
}
