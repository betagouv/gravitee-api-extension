import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraviteeModule } from 'src/gravitee/gravitee.module';
import databaseConfig from './config/database';
import serverConfig from './config/server';
import graviteeConfig from './config/gravitee';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, serverConfig, graviteeConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    GraviteeModule,
  ],
})
export class AppModule {}
