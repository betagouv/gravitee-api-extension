import { ApplicationMetadatum } from 'src/gravitee/application-metadatum';
import { UserMetadatum } from 'src/gravitee/user-metadatum.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'applications',
})
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => UserMetadatum,
    (userMetadatum) => userMetadatum.application,
    {
      eager: true,
    },
  )
  userMetadata: UserMetadatum[];

  @OneToMany(
    () => ApplicationMetadatum,
    (applicationMetadatum) => applicationMetadatum.application,
    {
      eager: true,
    },
  )
  applicationMetadata: ApplicationMetadatum[];
}
