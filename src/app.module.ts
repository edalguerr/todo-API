import { Global, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exceptions-filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import envConfigOptions from '../config/env-options.config';
import typeOrmConfig from 'config/typeOrm.config';
import { TaskModule } from './infrastructure/api/controller/task/task.module';
import { StateModule } from './infrastructure/api/controller/state/state.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(envConfigOptions),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    TaskModule,
    StateModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
