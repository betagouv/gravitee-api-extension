import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMetadatum } from 'src/gravitee/user-metadatum.entity';
import { Application } from 'src/gravitee/application.entity';
import { GraviteeController } from 'src/gravitee/gravitee.controller';
import { GraviteeService } from 'src/gravitee/gravitee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Application, UserMetadatum])],
  controllers: [GraviteeController],
  providers: [GraviteeService],
})
export class GraviteeModule {}
