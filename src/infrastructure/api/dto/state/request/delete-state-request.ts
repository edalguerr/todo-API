import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteStateRequestDTO {
  @ApiProperty({ example: 2 })
  @IsInt()
  id: number;
}
