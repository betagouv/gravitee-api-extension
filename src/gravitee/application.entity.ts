import { ApplicationMetadatum } from 'src/gravitee/application-metadatum';
import { Key } from 'src/gravitee/key.entity';
import { UserMetadatum } from 'src/gravitee/user-metadatum.entity';
import {
  AfterLoad,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'applications',
})
export class Application {
  @AfterLoad()
  emptyArrays() {
    if (this.userMetadata === undefined) this.userMetadata = [];
    if (this.applicationMetadata === undefined) this.applicationMetadata = [];
    if (this.keys === undefined) this.keys = [];
  }

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

  @OneToMany(() => Key, (key) => key.application, { eager: true })
  keys: Key[];
}
