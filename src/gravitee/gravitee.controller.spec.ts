import { Test } from '@nestjs/testing';
import { GraviteeController } from 'src/gravitee/gravitee.controller';
import { GraviteeService } from 'src/gravitee/gravitee.service';

describe('GraviteeController', () => {
  let controller: GraviteeController;
  const getApplicationDetailsMock = jest.fn();

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GraviteeController],
      providers: [
        {
          provide: GraviteeService,
          useFactory: () => ({
            getApplicationDetails: getApplicationDetailsMock,
          }),
        },
      ],
    }).compile();
    controller = moduleRef.get<GraviteeController>(GraviteeController);
  });

  describe('getApplication', () => {
    it('calls the Gravitee Service', async () => {
      await controller.getApplication({ id: 'yolo' });

      expect(getApplicationDetailsMock).toHaveBeenCalledWith('yolo');
    });
  });
});
