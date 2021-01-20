import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { GraviteeModule } from 'src/gravitee/gravitee.module';
import { Repository } from 'typeorm';
import { Application } from 'src/gravitee/application.entity';
import { ApplicationMetadata } from 'src/gravitee/application-metadata.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let applicationRepository: Repository<Application>;
  let metadataRepository: Repository<ApplicationMetadata>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqljs',
          synchronize: true,
          autoLoadEntities: true,
        }),
        GraviteeModule,
      ],
    }).compile();

    applicationRepository = moduleFixture.get<Repository<Application>>(
      getRepositoryToken(Application),
    );
    metadataRepository = moduleFixture.get<Repository<ApplicationMetadata>>(
      getRepositoryToken(ApplicationMetadata),
    );
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });

  it('/applications/non-uuid (GET)', () => {
    return request(app.getHttpServer())
      .get('/applications/non-uuid')
      .expect(400);
  });

  it('/applications/missing-uuid (GET)', () => {
    return request(app.getHttpServer())
      .get('/applications/a8fb65ee-d160-403b-9926-501cdf79a13e')
      .expect(404);
  });

  it('/applications/existing-uuid (GET)', async () => {
    const metadata1 = new ApplicationMetadata();
    metadata1.key = 'scopes';
    metadata1.value = 'croute,moustaki';

    const metadata2 = new ApplicationMetadata();
    metadata2.key = 'noise';
    metadata2.value = 'lol';

    const application = new Application();
    application.id = '63acf6a4-208a-400a-bd7b-ed8d621fefec';
    application.name = 'test application name';

    metadata1.application = application;
    metadata2.application = application;

    await applicationRepository.save(application);
    await metadataRepository.save([metadata1, metadata2]);

    return request(app.getHttpServer())
      .get(`/applications/${application.id}`)
      .expect(200, {
        id: application.id,
        name: application.name,
        scopes: metadata1.value,
      });
  });
});
