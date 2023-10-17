import { Injectable } from '@nestjs/common';
import { Task } from 'src/domain/entity/task';
import { TaskServiceI } from 'src/domain/service/task-service.interface';
import { TaskRepository } from '../repository/repository/task-repository';

@Injectable()
export class TaskServiceAdapter implements TaskServiceI {
  constructor(private taskRepository: TaskRepository) {}
  save(task: Task): Promise<Task> {
    return this.taskRepository.save(task);
  }
  async update(task: Task): Promise<Task> {
    await this.taskRepository.update(task.id, task);

    return this.taskRepository.findOneBy({ id: task.id });
  }
  async delete(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    return this.taskRepository.remove(task);
  }
  list(): Promise<Task[]> {
    return this.taskRepository.find();
  }
}
