import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsInt, IsArray } from 'class-validator';

export class UpdateTaskRequestDTO {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'Daily meeting' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Attend daily meeting' })
  @IsString()
  description: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  stateId: number;

  @ApiProperty({ example: [1, 2, 4] })
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  categories: number[];
}
