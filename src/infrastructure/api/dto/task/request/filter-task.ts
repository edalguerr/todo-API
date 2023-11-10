import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class FilterTaskRequestDTO {
  @IsOptional()
  @IsInt()
  id: number | null;

  @IsOptional()
  @IsString()
  name: string | null;

  @IsOptional()
  @IsInt()
  stateId: number | null;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  categories: number[] | null;
}
