import { Injectable } from '@nestjs/common';
import { StateServiceI } from 'src/domain/service/state-service.interface';
import { StateRepository } from '../repository/repository/state-repository';
import { State } from 'src/domain/entity/state';
import { State as StateDTO } from 'src/infrastructure/repository/dto/state';
import { Task } from 'src/domain/entity/task';

@Injectable()
export class StateServiceAdapter implements StateServiceI {
  constructor(private stateRepository: StateRepository) {}

  list(): Promise<State[]> {
    return this.stateRepository.find();
  }

  getDefaultState(): Promise<State> {
    return this.stateRepository.findOneBy({
      isDefault: true,
    });
  }

  getStateById(stateId: number): Promise<StateDTO> {
    return this.stateRepository.findOneBy({ id: stateId });
  }

  getTasks(stateId: number): Promise<Task[]> {
    return this.stateRepository.getTaskById(stateId);
  }

  save(state: State): Promise<State> {
    return this.stateRepository.save(state);
  }

  async update(state: State): Promise<void> {
    await this.stateRepository.update(state.id, state);
  }

  async delete(state: State): Promise<State> {
    await this.stateRepository.delete(state.id);

    return state;
  }
}
