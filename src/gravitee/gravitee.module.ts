import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from 'src/gravitee/application.entity';
import { GraviteeController } from 'src/gravitee/gravitee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [GraviteeController],
})
export class GraviteeModule {}
