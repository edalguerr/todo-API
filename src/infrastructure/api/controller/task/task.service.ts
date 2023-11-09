import { Injectable } from '@nestjs/common';
import { TaskService as TaskServiceApplication } from 'src/application/task-service/task-service';
import { TaskServiceAdapter } from 'src/infrastructure/adapter/task-service';
import { StateService } from '../state/state.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class TaskService {
  private applicationService: TaskServiceApplication;

  constructor(
    adapterService: TaskServiceAdapter,
    stateService: StateService,
    categoryService: CategoryService,
  ) {
    this.applicationService = new TaskServiceApplication(
      adapterService,
      stateService.app,
      categoryService.app,
    );
  }

  get app(): TaskServiceApplication {
    return this.applicationService;
  }
}
