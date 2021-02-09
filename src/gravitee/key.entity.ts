import { ApiKey } from 'src/gravitee/types';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Application } from './application.entity';

@Entity({
  name: 'keys',
})
export class Key {
  @PrimaryGeneratedColumn('uuid')
  key: ApiKey;

  @ManyToOne(() => Application, (application) => application.keys)
  @JoinColumn({ name: 'application' })
  application: Application;

  @Column('uuid')
  plan: string;
}
