import { Application } from 'src/gravitee/application.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'metadata',
})
export class UserMetadatum {
  @ManyToOne(() => Application, (application) => application.userMetadata, {
    primary: true,
  })
  @JoinColumn({ name: 'reference_id' })
  application: Application;

  @PrimaryColumn()
  name: string;

  @Column()
  value: string;
}
