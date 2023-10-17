import { SaveStateRequestDTO } from 'src/infrastructure/api/dto/state/request/save-state-request';

export class SaveStateDTOtoEntity {
  id: number;
  name: string;
  isDefault: boolean;
  constructor(requestDTO: SaveStateRequestDTO) {
    ({ name: this.name } = requestDTO);
  }
}
