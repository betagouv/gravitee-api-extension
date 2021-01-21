import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { GraviteeModule } from 'src/gravitee/gravitee.module';
import { Repository } from 'typeorm';
import { Application } from 'src/gravitee/application.entity';
import { Metadatum } from 'src/gravitee/metadatum.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let applicationRepository: Repository<Application>;
  let metadatumRepository: Repository<Metadatum>;

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
    metadatumRepository = moduleFixture.get<Repository<Metadatum>>(
      getRepositoryToken(Metadatum),
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
    const metadatum1 = new Metadatum();
    metadatum1.name = 'scopes';
    metadatum1.value = 'croute,moustaki';

    const metadatum2 = new Metadatum();
    metadatum2.name = 'noise';
    metadatum2.value = 'lol';

    const application = new Application();
    application.id = '63acf6a4-208a-400a-bd7b-ed8d621fefec';
    application.name = 'test application name';

    metadatum1.application = application;
    metadatum2.application = application;

    await applicationRepository.save(application);
    await metadatumRepository.save([metadatum1, metadatum2]);

    return request(app.getHttpServer())
      .get(`/applications/${application.id}`)
      .expect(200, {
        id: application.id,
        name: application.name,
        scopes: metadatum1.value,
      });
  });
});
