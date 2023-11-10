import { Global, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/filters/http-exceptions-filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import envConfigOptions from '../config/env-options.config';
import typeOrmConfig from 'config/typeOrm.config';
import { TaskModule } from './infrastructure/api/controller/task/task.module';
import { StateModule } from './infrastructure/api/controller/state/state.module';
import { CategoryModule } from './infrastructure/api/controller/category/category.module';
import { CustomExceptionFilter } from './shared/filters/custom-exceptions-filter';

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
    CategoryModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
