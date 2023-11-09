import { IsString, IsInt } from 'class-validator';

export class UpdateCategoryRequestDTO {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}
