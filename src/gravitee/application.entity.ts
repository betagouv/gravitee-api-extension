import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'applications',
})
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
