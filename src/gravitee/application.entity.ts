import { Metadatum } from 'src/gravitee/metadatum.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'applications',
})
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Metadatum, (metadatum) => metadatum.application, {
    eager: true,
  })
  metadata: Metadatum[];
}
