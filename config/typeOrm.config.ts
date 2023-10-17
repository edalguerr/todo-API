import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Task } from 'src/infrastructure/repository/dto/task';
import { State } from 'src/infrastructure/repository/dto/state';
import { Category } from 'src/infrastructure/repository/dto/category';
import { TaskRepository } from 'src/infrastructure/repository/repository/task-repository';

enum databaseOptions {
  MYSQL = 'mysql',
  POSTGRESS = 'postgres',
}

const ENTITIES_LIST = [Task, State, Category];

async function typeOrmConfig(
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> {
  return {
    type: configService.get<databaseOptions>('DB_CONNECTION'),
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    database: configService.get<string>('DB_DATABASE'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    entities: ENTITIES_LIST,
    synchronize: true,
  };
}

export const REPOSITORIES = [TaskRepository];

export default typeOrmConfig;
