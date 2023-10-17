import { IsString, IsInt, IsArray, IsOptional } from 'class-validator';
import { Category } from 'src/domain/entity/category';

export class SaveTaskResponseDTO {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  stateId: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  categories: Category[];
}
