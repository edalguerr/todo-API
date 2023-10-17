import { Type } from 'class-transformer';
import { IsString, IsInt, IsArray, IsOptional } from 'class-validator';

export class SaveTaskRequestDTO {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  @IsInt()
  stateId: number;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  categories: number[];
}
