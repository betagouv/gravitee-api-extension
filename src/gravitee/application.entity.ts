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
}
