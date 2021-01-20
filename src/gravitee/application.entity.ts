import { ApplicationMetadata } from 'src/gravitee/application-metadata.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'applications',
})
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => ApplicationMetadata, (metadata) => metadata.application, {
    eager: true,
  })
  metadata: ApplicationMetadata[];
}
