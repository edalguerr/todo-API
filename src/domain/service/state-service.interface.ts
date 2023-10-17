import { State } from '../entity/state';

export interface StateServiceI {
  save: (state: State) => Promise<State>;
  // update: (state: State) => State;
  // delete: (id: number) => State;
  list: () => Promise<State[]>;
  getDefaultState: () => Promise<State>;
}
