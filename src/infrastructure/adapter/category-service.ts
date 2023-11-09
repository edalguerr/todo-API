import { Category as CategoryDTO } from '../repository/dto/category';
import { CategoryServiceI } from 'src/domain/service/category-service.interface';
import { CategoryRepository } from '../repository/repository/category-repository';
import { Injectable } from '@nestjs/common';
import { Category } from 'src/domain/entity/category';
import { Task } from '../repository/dto/task';

@Injectable()
export class CategoryServiceAdapter implements CategoryServiceI {
  constructor(private categoryRepository: CategoryRepository) {}
  list(): Promise<CategoryDTO[]> {
    return this.categoryRepository.find();
  }

  save(category: Category): Promise<Category> {
    return this.categoryRepository.save(category);
  }

  async update(category: Category): Promise<void> {
    await this.categoryRepository.update(category.id, category);
  }

  getCategoryById(categoryId: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id: categoryId });
  }

  getTasks(categoryId: number): Promise<Task[]> {
    return this.categoryRepository.getTaskById(categoryId);
  }

  async delete(category: Category): Promise<Category> {
    await this.categoryRepository.delete(category.id);

    return category;
  }
}
