import { IsString } from 'class-validator';

export class SaveCategoryRequestDTO {
  @IsString()
  name: string;
}
