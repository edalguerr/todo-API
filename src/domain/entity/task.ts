import { Category } from './category';
import { State } from './state';

export class Task {
  id: number;
  title: string;
  description: string;
  state: State;
  categories: Category[];
}
