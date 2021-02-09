import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindOneApplicationParams } from 'src/gravitee/application.params';
import { ReplaceLegacyTokenDto } from 'src/gravitee/dtos';
import { EntityNotFoundExceptionFilter } from 'src/gravitee/entity-not-found-exception.filter';
import { GraviteeService } from 'src/gravitee/gravitee.service';
import { ApiKey, EnrichedApplication } from 'src/gravitee/types'; // eslint-disable-line @typescript-eslint/no-unused-vars

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

  @Post('/tokens/replace-legacy')
  @UseFilters(EntityNotFoundExceptionFilter)
  @UsePipes(new ValidationPipe())
  replaceLegacyToken(
    @Body() replaceLegacyTokenDto: ReplaceLegacyTokenDto,
  ): Promise<ApiKey> {
    return this.graviteeService.searchNewApiKey(
      replaceLegacyTokenDto.legacyToken,
    );
  }
}
