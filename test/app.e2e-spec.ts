import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { GraviteeModule } from 'src/gravitee/gravitee.module';
import { Repository } from 'typeorm';
import { Application } from 'src/gravitee/application.entity';
import { UserMetadatum } from 'src/gravitee/user-metadatum.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let applicationRepository: Repository<Application>;
  let userMetadatumRepository: Repository<UserMetadatum>;

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
    userMetadatumRepository = moduleFixture.get<Repository<UserMetadatum>>(
      getRepositoryToken(UserMetadatum),
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
    const userMetadatum1 = new UserMetadatum();
    userMetadatum1.name = 'scopes';
    userMetadatum1.value = 'croute,moustaki';

    const userMetadatum2 = new UserMetadatum();
    userMetadatum2.name = 'noise';
    userMetadatum2.value = 'lol';

    const application = new Application();
    application.id = '63acf6a4-208a-400a-bd7b-ed8d621fefec';
    application.name = 'test application name';

    userMetadatum1.application = application;
    userMetadatum2.application = application;

    await applicationRepository.save(application);
    await userMetadatumRepository.save([userMetadatum1, userMetadatum2]);

    return request(app.getHttpServer())
      .get(`/applications/${application.id}`)
      .expect(200, {
        id: application.id,
        name: application.name,
        scopes: userMetadatum1.value,
      });
  });
});
