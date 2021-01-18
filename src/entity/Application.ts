import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Application {
    @PrimaryGeneratedColumn("uuid")
    id: string;
}
