import { FilterParamsI } from 'src/shared/interfaces/filter-params.interface';
import { Task } from '../entity/task';

export interface TaskServiceI {
  save: (task: Task) => Promise<Task>;
  update: (task: Task) => Promise<Task>;
  delete: (task: Task) => Promise<Task>;
  list: () => Promise<Task[]>; //TODO: should become a filter to list and filter by one or more criteria
  getTaskById: (id: number) => Promise<Task>;
  filter: (criteria: FilterParamsI) => Promise<Task[]>;
}
