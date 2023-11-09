import { Category } from 'src/domain/entity/category';
import { State } from 'src/domain/entity/state';
import { UpdateTaskRequestDTO } from 'src/infrastructure/api/dto/task/request/update-task-request';

export class UpdateTaskDTOtoEntity {
  id: number;
  title: string;
  description: string;
  state: State;
  categories: Category[];
  constructor(requestDTO: UpdateTaskRequestDTO) {
    ({
      id: this.id,
      title: this.title,
      description: this.description,
    } = requestDTO);
  }
}
