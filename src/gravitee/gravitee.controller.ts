import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/gravitee/application.entity';
import { Repository } from 'typeorm';

@Controller()
export class GraviteeController {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  @Get('/applications')
  getApplications(): Promise<Application[]> {
    return this.applicationRepository.find();
  }
}
