import { State } from 'src/domain/entity/state';
import { Task } from 'src/domain/entity/task';
import { StateServiceI } from 'src/domain/service/state-service.interface';
import { DefaultDependencyException } from 'src/shared/exceptions/default-dependency-exception';
import { DependencyException } from 'src/shared/exceptions/dependecy-exception';
import { NotFoundException } from 'src/shared/exceptions/not-found-exception';

export class StateService {
  constructor(private stateService: StateServiceI) {}

  list(): Promise<State[]> {
    return this.stateService.list();
  }

  getDefaultState(): Promise<State> {
    return this.stateService.getDefaultState();
  }

  async getStateById(stateId: number): Promise<State> {
    const state = await this.stateService.getStateById(stateId);
    if (!state) {
      throw new NotFoundException();
    }
    return state;
  }

  async getTasks(stateId: number): Promise<Task[]> {
    const tasks = await this.stateService.getTasks(stateId);
    if (!tasks) throw new NotFoundException();
    return tasks;
  }

  save(state: State): Promise<State> {
    state.name = state.name.toUpperCase();
    return this.stateService.save(state);
  }

  async update(state: State): Promise<State> {
    await this.stateService.update(state);
    return this.getStateById(state.id);
  }

  async delete(id: number): Promise<State> {
    const state = await this.getStateById(id);
    const tasks = await this.getTasks(state.id);
    if (state.isDefault) throw new DefaultDependencyException('State');
    if (tasks.length > 0) throw new DependencyException('State');

    return this.stateService.delete(state);
  }
}
