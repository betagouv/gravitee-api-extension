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
      };
      applicationRepository.findOneOrFail.mockReturnValue(expectedResult);
      const actualResult = await graviteeService.getApplicationDetails(
        expectedResult.id,
      );

      expect(actualResult).toStrictEqual(expectedResult);
    });
  });
});