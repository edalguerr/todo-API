import { IsString, IsInt, IsArray, IsOptional } from 'class-validator';
import { Category } from 'src/domain/entity/category';
import { State } from 'src/domain/entity/state';

export class UpdateTaskResponseDTO {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  state: State;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  categories: Category[];
}
