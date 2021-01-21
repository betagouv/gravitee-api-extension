import { Application } from 'src/gravitee/application.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'metadata',
})
export class Metadatum {
  @ManyToOne(() => Application, (application) => application.metadata, {
    primary: true,
  })
  @JoinColumn({ name: 'reference_id' })
  application: Application;

  @PrimaryColumn()
  name: string;

  @Column()
  value: string;
}
