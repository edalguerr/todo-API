import { State } from 'src/domain/entity/state';
import { StateServiceI } from 'src/domain/service/state-service.interface';

export class StateService {
  constructor(private stateService: StateServiceI) {}

  list(): Promise<State[]> {
    return this.stateService.list();
  }

  getDefaultState(): Promise<State> {
    return this.stateService.getDefaultState();
  }

  save(state: State): Promise<State> {
    state.name = state.name.toUpperCase();
    return this.stateService.save(state);
  }
}
