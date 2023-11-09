import { IsString, IsInt } from 'class-validator';

export class CategoryResponseDTO {
  @IsInt()
  id: number;

  @IsString()
  name: string;
}
