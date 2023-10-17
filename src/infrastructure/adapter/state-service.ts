import { Injectable } from '@nestjs/common';
import { StateServiceI } from 'src/domain/service/state-service.interface';
import { StateRepository } from '../repository/repository/state-repository';
import { State } from 'src/domain/entity/state';

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

  save(state: State): Promise<State> {
    return this.stateRepository.save(state);
  }
}
