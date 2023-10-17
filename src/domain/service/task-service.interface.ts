import { Task } from '../entity/task';

export interface TaskServiceI {
  save: (task: Task) => Promise<Task>;
  update: (task: Task) => Promise<Task>;
  delete: (id: number) => Promise<Task>;
  list: () => Promise<Task[]>; //TODO: should become a filter to list and filter by one or more criteria
}