import { Repository } from 'typeorm';
import { Task } from '../dto/task';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Task as TaskE } from 'src/domain/entity/task';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  findByName(title: string) {
    return this.findOne({ where: { title } });
  }

  async updateTask(task: TaskE): Promise<TaskE> {
    const taskToUpdate = await this.findOneBy({ id: task.id });
    if (!taskToUpdate) return;

    return this.save(task);
  }
}
