import { Category } from 'src/domain/entity/category';
import { Task } from 'src/domain/entity/task';
import { CategoryServiceI } from 'src/domain/service/category-service.interface';
import { DependencyException } from 'src/shared/exceptions/dependecy-exception';
import { NotFoundException } from 'src/shared/exceptions/not-found-exception';

export class CategoryService {
  constructor(private categoryService: CategoryServiceI) {}

  list(): Promise<Category[]> {
    return this.categoryService.list();
  }

  save(category: Category): Promise<Category> {
    return this.categoryService.save(category);
  }

  async update(category: Category): Promise<Category> {
    await this.categoryService.update(category);
    return this.getCategoryById(category.id);
  }

  async getCategoryById(categoryId: number): Promise<Category> {
    const category = await this.categoryService.getCategoryById(categoryId);
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async getTasks(categoryId: number): Promise<Task[]> {
    const tasks = await this.categoryService.getTasks(categoryId);
    if (!tasks) throw new NotFoundException();

    return tasks;
  }

  async delete(id: number): Promise<Category> {
    const category = await this.getCategoryById(id);
    const tasks = await this.getTasks(category.id);
    if (tasks.length > 0) throw new DependencyException('Category');
    return this.categoryService.delete(category);
  }
}
