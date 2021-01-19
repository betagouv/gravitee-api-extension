import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/gravitee/application.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GraviteeService {
  public constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async getApplicationDetails(applicationId: string) {
    return [];
  }
}
