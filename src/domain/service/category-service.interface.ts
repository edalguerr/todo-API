import { Category } from '../entity/category';
import { Task } from '../entity/task';

export interface CategoryServiceI {
  save: (category: Category) => Promise<Category>;
  update: (category: Category) => void;
  delete: (category: Category) => Promise<Category>;
  list: () => Promise<Category[]>;
  getCategoryById: (categoryId: number) => Promise<Category>;
  getTasks: (categoryId: number) => Promise<Task[]>;
}
