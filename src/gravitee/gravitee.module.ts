import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMetadatum } from 'src/gravitee/user-metadatum.entity';
import { Application } from 'src/gravitee/application.entity';
import { GraviteeController } from 'src/gravitee/gravitee.controller';
import { GraviteeService } from 'src/gravitee/gravitee.service';
import { ApplicationMetadatum } from 'src/gravitee/application-metadatum';
import { ConfigService } from '@nestjs/config';
import { Key } from 'src/gravitee/key.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Application,
      UserMetadatum,
      ApplicationMetadatum,
      Key,
    ]),
  ],
  controllers: [GraviteeController],
  providers: [GraviteeService, ConfigService],
})
export class GraviteeModule {}
