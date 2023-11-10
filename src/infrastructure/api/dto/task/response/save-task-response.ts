import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsArray, IsOptional } from 'class-validator';
import { Category } from 'src/domain/entity/category';

export class SaveTaskResponseDTO {
  @ApiProperty({ example: 1, description: 'Task id' })
  @IsInt()
  id: number;

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
  stateId: number;

  @ApiProperty({ example: [{ id: 1, name: 'Work' }] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  categories: Category[];
}
