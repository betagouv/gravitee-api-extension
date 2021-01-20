import {
  Controller,
  Get,
  Param,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Application } from 'src/gravitee/application.entity'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { FindOneApplicationParams } from 'src/gravitee/application.params';
import { EntityNotFoundExceptionFilter } from 'src/gravitee/entity-not-found-exception.filter';
import { GraviteeService } from 'src/gravitee/gravitee.service';

@Controller()
export class GraviteeController {
  constructor(private graviteeService: GraviteeService) {}

  @Get('/applications/:id')
  @UseFilters(EntityNotFoundExceptionFilter)
  @UsePipes(new ValidationPipe())
  getApplication(
    @Param() params: FindOneApplicationParams,
  ): Promise<Application> {
    return this.graviteeService.getApplicationDetails(params.id);
  }
}
