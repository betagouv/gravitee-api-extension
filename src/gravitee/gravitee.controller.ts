import {
  Controller,
  Get,
  Param,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindOneApplicationParams } from 'src/gravitee/application.params';
import { EntityNotFoundExceptionFilter } from 'src/gravitee/entity-not-found-exception.filter';
import { GraviteeService } from 'src/gravitee/gravitee.service';
import { EnrichedApplication } from 'src/gravitee/types'; // eslint-disable-line @typescript-eslint/no-unused-vars

@Controller()
export class GraviteeController {
  constructor(private graviteeService: GraviteeService) {}

  @Get('/applications/:id')
  @UseFilters(EntityNotFoundExceptionFilter)
  @UsePipes(new ValidationPipe())
  getApplication(
    @Param() params: FindOneApplicationParams,
  ): Promise<EnrichedApplication> {
    return this.graviteeService.getApplicationDetails(params.id);
  }
}
