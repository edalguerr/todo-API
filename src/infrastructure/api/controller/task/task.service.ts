import { Injectable } from '@nestjs/common';
import { TaskService as TaskServiceApplication } from 'src/application/task-service/task-service';
import { TaskServiceAdapter } from 'src/infrastructure/adapter/task-service';
import { StateService } from '../state/state.service';

@Injectable()
export class TaskService {
  private applicationService: TaskServiceApplication;

  constructor(adapterService: TaskServiceAdapter, stateService: StateService) {
    this.applicationService = new TaskServiceApplication(
      adapterService,
      stateService.app,
    );
  }

  get app(): TaskServiceApplication {
    return this.applicationService;
  }
}
