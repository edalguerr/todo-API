import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsInt, IsArray, IsOptional } from 'class-validator';

export class SaveTaskRequestDTO {
  @ApiProperty({ example: 'Daily meeting' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Attend daily meeting' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsInt()
  @IsInt()
  stateId: number;

  @ApiProperty({ example: [1, 2, 4] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number)
  categories: number[];
}
