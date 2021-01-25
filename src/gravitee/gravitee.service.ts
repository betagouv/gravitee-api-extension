import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { Repository } from 'typeorm';
import { EnrichedApplication } from 'src/gravitee/types';

@Injectable()
export class GraviteeService {
  public constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async getApplicationDetails(
    applicationId: string,
  ): Promise<EnrichedApplication> {
    const application = await this.applicationRepository.findOneOrFail(
      applicationId,
    );
    const enrichedApplication = {
      id: application.id,
      name: application.name,
      scopes: '',
      clientId: '',
    };
    application.userMetadata.forEach((userMetadatum) => {
      if (userMetadatum.name === 'scopes') {
        enrichedApplication.scopes = userMetadatum.value;
      }
    });
    application.applicationMetadata.forEach((applicationMetadatum) => {
      if (applicationMetadatum.name === 'client_id') {
        enrichedApplication.clientId = applicationMetadatum.value;
      }
    });

    return enrichedApplication;
  }
}
