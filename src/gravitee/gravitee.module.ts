import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from 'src/gravitee/application.entity';
import { GraviteeController } from 'src/gravitee/gravitee.controller';
import { GraviteeService } from 'src/gravitee/gravitee.service';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [GraviteeController],
  providers: [GraviteeService],
})
export class GraviteeModule {}
