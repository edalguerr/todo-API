import { Type } from 'class-transformer';
import { IsString, IsInt, IsArray } from 'class-validator';

export class UpdateTaskRequestDTO {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  stateId: number;

  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  categories: number[];
}
