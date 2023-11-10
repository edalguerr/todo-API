import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class FilterTaskRequestDTO {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  id: number | null;

  @ApiProperty({ example: 'tarea' })
  @IsOptional()
  @IsString()
  name: string | null;

  @ApiProperty({ example: 4 })
  @IsOptional()
  @IsInt()
  stateId: number | null;

  @ApiProperty({ example: [1, 4] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  categories: number[] | null;
}
