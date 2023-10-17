import { State } from 'src/domain/entity/state';
import { StateResponseDTO } from 'src/infrastructure/api/dto/state/response/state-response';

export class ListStatesEntityToDTO {
  statesList: StateResponseDTO[] = [];

  constructor(states: State[]) {
    states.forEach(({ id, name, isDefault }) => {
      this.statesList.push({
        id,
        name,
        isDefault,
      });
    });
  }
}
