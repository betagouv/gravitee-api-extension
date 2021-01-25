import { Application } from 'src/gravitee/application.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'application_metadata',
})
export class ApplicationMetadatum {
  @ManyToOne(
    () => Application,
    (application) => application.applicationMetadata,
    {
      primary: true,
    },
  )
  @JoinColumn({ name: 'application_id' })
  application: Application;

  @PrimaryColumn({ name: 'k' })
  name: string;

  @Column({ name: 'v' })
  value: string;
}
