import { Task } from 'src/domain/entity/task';
import { StateServiceI } from 'src/domain/service/state-service.interface';
import { TaskServiceI } from 'src/domain/service/task-service.interface';

export class TaskService {
  constructor(
    private taskService: TaskServiceI,
    private stateService: StateServiceI,
  ) {}
  async save(task: Task): Promise<Task> {
    if (!task.state) {
      task.state = await this.stateService.getDefaultState();
    }
    return this.taskService.save(task);
  }

  update(task: Task): Promise<Task> {
    return this.taskService.update(task);
  }

  delete(task: Task): Promise<Task> {
    return this.taskService.delete(task.id);
  }

  list(): Promise<Task[]> {
    return this.taskService.list();
  }
}
