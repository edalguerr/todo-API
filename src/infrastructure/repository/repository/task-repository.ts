import { Repository } from 'typeorm';
import { Task } from '../dto/task';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  findByName(title: string) {
    return this.findOne({ where: { title } });
  }
}
