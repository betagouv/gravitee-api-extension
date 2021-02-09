import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { ApiKey, EnrichedApplication } from 'src/gravitee/types';
import { ConfigService } from '@nestjs/config';
import { Key } from 'src/gravitee/key.entity';

@Injectable()
export class GraviteeService {
  public constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    @InjectRepository(Key)
    private readonly keyRepository: Repository<Key>,
    private readonly configService: ConfigService,
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

  async searchNewApiKey(apiKey: string): Promise<ApiKey> {
    const apiKeyHash = this.computeApiKeyHash(apiKey);

    const key = await this.keyRepository
      .createQueryBuilder('key')
      .innerJoin('key.application', 'application')
      .innerJoin('application.userMetadata', 'metadatum')
      .where('metadatum.value = :value', { value: apiKeyHash })
      .andWhere('key.plan = :plan', {
        plan: this.configService.get('gravitee.apiParticulierPlanId'),
      })
      .getOneOrFail();

    return key.key as ApiKey;
  }

  private computeApiKeyHash(apiKey: string) {
    const hash = crypto.createHash('sha512');
    const hashedKey = hash.update(apiKey);

    return hashedKey.digest('hex');
  }
}
