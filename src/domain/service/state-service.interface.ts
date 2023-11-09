import { State } from '../entity/state';
import { Task } from '../entity/task';

export interface StateServiceI {
  save: (state: State) => Promise<State>;
  update: (state: State) => void;
  delete: (state: State) => Promise<State>;
  list: () => Promise<State[]>;
  getDefaultState: () => Promise<State>;
  getStateById: (id: number) => Promise<State>;
  getTasks: (stateId: number) => Promise<Task[]>;
}
