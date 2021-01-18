import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("applications")
export class Application {
  @PrimaryGeneratedColumn("uuid")
  id: string;
}
