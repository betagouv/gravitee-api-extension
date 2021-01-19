import { Application } from 'src/gravitee/application.entity';
import { Repository } from 'typeorm';
import { GraviteeService } from './gravitee.service';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<Record<string, unknown>>;
};

describe('GraviteeService', () => {
  let graviteeService: GraviteeService;
  let applicationRepository: MockType<Repository<Application>>;

  beforeEach(() => {
    applicationRepository = {
      findOne: jest.fn(),
    };
    graviteeService = new GraviteeService(applicationRepository);
  });

  describe('getApplicationDetails', () => {
    it('should find an application by its id', async () => {
      const expectedResult = {
        id: 'the-application-id',
        name: 'Test application name',
      };
      const actualResult = await graviteeService.getApplicationDetails(
        expectedResult.id,
      );

      expect(actualResult).toStrictEqual(expectedResult);
    });
  });
});
