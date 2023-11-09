import { SaveCategoryRequestDTO } from 'src/infrastructure/api/dto/category/request/save-category-request';

export class SaveCategoryDTOtoEntity {
  id: number;
  name: string;

  constructor(category: SaveCategoryRequestDTO) {
    ({ name: this.name } = category);
  }
}
