import { Controller, Get } from '@nestjs/common';
import { Application } from 'src/gravitee/application.entity'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { GraviteeService } from 'src/gravitee/gravitee.service';

@Controller()
export class GraviteeController {
  constructor(private graviteeService: GraviteeService) {}

  @Get('/application')
  getApplication(): Promise<Application> {
    return this.graviteeService.getApplicationDetails('yolo');
  }
}
