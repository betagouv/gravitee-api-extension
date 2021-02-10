import { Application } from './application.entity';
import { Repository } from 'typeorm';
import { GraviteeService } from './gravitee.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType, repositoryMockFactory } from 'test/types';
import { ConfigService } from '@nestjs/config';
import { mockedConfigService } from 'test/mocks/config.service';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Key } from 'src/gravitee/key.entity';

describe('GraviteeService', () => {
  let graviteeService: GraviteeService;
  let applicationRepository: MockType<Repository<Application>>;
  let keyRepository: MockType<Repository<Key>>;
  const getOneOrFailMock = jest.fn();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GraviteeService,
        {
          provide: getRepositoryToken(Application),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Key),
          useFactory: repositoryMockFactory,
        },
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
      ],
    }).compile();
    graviteeService = moduleRef.get<GraviteeService>(GraviteeService);
    applicationRepository = moduleRef.get(getRepositoryToken(Application));
    keyRepository = moduleRef.get(getRepositoryToken(Key));
    keyRepository.createQueryBuilder.mockReturnValue({
      innerJoin: jest.fn().mockReturnValue({
        innerJoin: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            andWhere: jest.fn().mockReturnValue({
              andWhere: jest.fn().mockReturnValue({
                getOneOrFail: getOneOrFailMock,
              }),
            }),
          }),
        }),
      }),
    });
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

  describe('searchNewApiKey', () => {
    const legacyTokenHash = 'legacy-token-hash-maggle';

    it('returns the new API key when the provided token is a legacy token', async () => {
      const expectedResult = 'new-api-key';
      getOneOrFailMock.mockReturnValue({
        key: expectedResult,
      });

      const newApiKey = await graviteeService.searchNewApiKey(legacyTokenHash);

      expect(newApiKey).toBe(expectedResult);
    });

    it('returns an EntityNotFoundException when the provided token is not a legacy token', async () => {
      getOneOrFailMock.mockRejectedValue(
        new EntityNotFoundError(Key, null) as never,
      );

      expect(graviteeService.searchNewApiKey('croute')).rejects.toEqual(
        new EntityNotFoundError(Key, null),
      );
    });
  });
});
