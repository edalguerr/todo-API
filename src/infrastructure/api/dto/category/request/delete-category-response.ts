import { IsInt } from 'class-validator';

export class DeleteCategoryRequestDTO {
  @IsInt()
  id: number;
}
