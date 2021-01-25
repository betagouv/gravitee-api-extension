import { Application } from './application.entity';
import { Repository } from 'typeorm';
import { GraviteeService } from './gravitee.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType, repositoryMockFactory } from 'test/types';

describe('GraviteeService', () => {
  let graviteeService: GraviteeService;
  let applicationRepository: MockType<Repository<Application>>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GraviteeService,
        {
          provide: getRepositoryToken(Application),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    graviteeService = moduleRef.get<GraviteeService>(GraviteeService);
    applicationRepository = moduleRef.get(getRepositoryToken(Application));
  });

  describe('getApplicationDetails', () => {
    it('should find an application by its id', async () => {
      const expectedResult = {
        id: 'the-application-id',
        name: 'Test application name',
        scopes: 'test_scope_1,test_scope_2',
        clientId: 'the client id',
      };
      applicationRepository.findOneOrFail.mockReturnValue({
        id: expectedResult.id,
        name: expectedResult.name,
        userMetadata: [
          {
            name: 'client_id',
            value: 'croute',
          },
          {
            name: 'scopes',
            value: 'test_scope_1,test_scope_2',
          },
        ],
        applicationMetadata: [
          {
            name: 'client_id',
            value: 'the client id',
          },
          {
            name: 'type',
            value: 'web',
          },
        ],
      });
      const actualResult = await graviteeService.getApplicationDetails(
        expectedResult.id,
      );

      expect(actualResult).toStrictEqual(expectedResult);
    });
  });
});
