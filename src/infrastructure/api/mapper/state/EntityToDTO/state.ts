import { State } from 'src/domain/entity/state';

export class StateEntityToDTO {
  id: number;
  name: string;
  isDefault: boolean;
  constructor(state: State) {
    ({ id: this.id, name: this.name, isDefault: this.isDefault } = state);
  }
}
