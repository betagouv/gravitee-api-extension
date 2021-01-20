import { Application } from 'src/gravitee/application.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'application_metadata',
})
export class ApplicationMetadata {
  @ManyToOne(() => Application, (application) => application.metadata, {
    primary: true,
  })
  @JoinColumn({ name: 'application_id' })
  application: Application;

  @PrimaryColumn({ name: 'k' })
  key: string;

  @Column({ name: 'v' })
  value: string;
}
