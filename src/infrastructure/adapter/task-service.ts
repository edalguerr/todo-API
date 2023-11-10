import { Injectable } from '@nestjs/common';
import { Task } from 'src/domain/entity/task';
import { Task as TaskR } from '../repository/dto/task';
import { TaskServiceI } from 'src/domain/service/task-service.interface';
import { TaskRepository } from '../repository/repository/task-repository';
import { FilterParamsI } from 'src/shared/interfaces/filter-params.interface';
import { ILike, In } from 'typeorm';

@Injectable()
export class TaskServiceAdapter implements TaskServiceI {
  constructor(private taskRepository: TaskRepository) {}
  save(task: Task): Promise<Task> {
    return this.taskRepository.save(task);
  }
  update(task: Task): Promise<Task> {
    return this.taskRepository.updateTask(task);
  }
  delete(task: TaskR): Promise<Task> {
    return this.taskRepository.remove(task);
  }
  list(): Promise<Task[]> {
    return this.taskRepository.find({
      relations: {
        categories: true,
        state: true,
      },
    });
  }

  getTaskById(id: number): Promise<Task> {
    return this.taskRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        state: true,
        categories: true,
      },
    });
  }

  async filter(criteria: FilterParamsI): Promise<Task[]> {
    const taskResult: Task[] = await this.taskRepository.find({
      where: {
        id: criteria?.id,
        title: ILike(`%${criteria?.name || ''}%`),
        state: {
          id: criteria?.stateId,
        },
        categories: {
          id: criteria?.categories ? In(criteria?.categories) : null,
        },
      },
      relations: {
        state: true,
        categories: true,
      },
    });

    const promises = taskResult?.map(async (task) => {
      task.categories = (await this.getTaskById(task.id)).categories;
    });

    await Promise.all(promises);

    return taskResult;
  }
}
