import { Category } from 'src/domain/entity/category';
import { Task } from 'src/domain/entity/task';

export class SaveTaskEntityToDTO {
  id: number;
  title: string;
  description: string;
  stateId: number;
  categories: Category[];
  constructor(task: Task) {
    ({
      id: this.id,
      title: this.title,
      description: this.description,
      state: { id: this.stateId },
      categories: this.categories,
    } = task);
  }
}
