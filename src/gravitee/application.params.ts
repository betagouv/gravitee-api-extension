import { IsUUID } from 'class-validator';

export class FindOneApplicationParams {
  @IsUUID('4')
  id: string;
}
