import { Category } from '../entity/category';

export interface CategoryService {
  save: (category: Category) => Category;
  update: (category: Category) => Category;
  delete: (id: number) => Category;
  list: () => Category[];
}
