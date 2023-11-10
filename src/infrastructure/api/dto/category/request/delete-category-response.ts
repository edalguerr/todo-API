import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteCategoryRequestDTO {
  @ApiProperty({ example: 2 })
  @IsInt()
  id: number;
}
