import { Category } from 'src/domain/entity/category';
import { State } from 'src/domain/entity/state';
import { SaveTaskRequestDTO } from 'src/infrastructure/api/dto/task/request/save-task-request';

export class SaveTaskDTOtoEntity {
  id: number;
  title: string;
  description: string;
  state: State;
  categories: Category[];
  constructor(requestDTO: SaveTaskRequestDTO) {
    ({ title: this.title, description: this.description } = requestDTO);
  }
}
