import { UpdateStateRequestDTO } from 'src/infrastructure/api/dto/state/request/update-state-request';

export class UpdateStateDTOtoEntity {
  id: number;
  name: string;
  isDefault: boolean;
  constructor(requestDTO: UpdateStateRequestDTO) {
    ({ id: this.id, name: this.name } = requestDTO);
  }
}
