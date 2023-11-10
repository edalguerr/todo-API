import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class CategoryResponseDTO {
  @ApiProperty({ example: 2 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'Work' })
  @IsString()
  name: string;
}
