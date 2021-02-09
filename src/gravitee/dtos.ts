import { IsNotEmpty, IsString } from 'class-validator';

export class ReplaceLegacyTokenDto {
  @IsNotEmpty()
  @IsString()
  legacyToken: string;
}
