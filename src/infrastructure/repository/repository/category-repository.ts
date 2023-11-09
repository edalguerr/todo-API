import { DataSource, Repository } from 'typeorm';
import { Category } from '../dto/category';
import { Injectable } from '@nestjs/common';
import { Task } from '../dto/task';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async getTaskById(categoryId: number): Promise<Task[]> {
    return (
      await this.findOne({
        where: {
          id: categoryId,
        },
        relations: {
          tasks: true,
        },
      })
    )?.tasks;
  }
}
