import { Controller, Get, Param } from '@nestjs/common';
import { Application } from 'src/gravitee/application.entity'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { FindOneApplicationParams } from 'src/gravitee/application.params';
import { GraviteeService } from 'src/gravitee/gravitee.service';

@Controller()
export class GraviteeController {
  constructor(private graviteeService: GraviteeService) {}

  @Get('/applications/:id')
  getApplication(
    @Param() params: FindOneApplicationParams,
  ): Promise<Application> {
    return this.graviteeService.getApplicationDetails(params.id);
  }
}
