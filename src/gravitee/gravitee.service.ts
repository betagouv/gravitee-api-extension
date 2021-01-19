import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GraviteeService {
  public constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async getApplicationDetails(applicationId: string): Promise<Application> {
    return this.applicationRepository.findOneOrFail(applicationId);
  }
}
