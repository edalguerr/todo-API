import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskServiceAdapter } from 'src/infrastructure/adapter/task-service';
import { TaskRepository } from 'src/infrastructure/repository/repository/task-repository';

import { StateModule } from '../state/state.module';
import { CategoryModule } from '../category/category.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService, TaskServiceAdapter, TaskRepository],
  imports: [StateModule, CategoryModule],
})
export class TaskModule {}
