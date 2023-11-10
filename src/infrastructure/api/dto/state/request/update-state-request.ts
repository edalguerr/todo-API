import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class UpdateStateRequestDTO {
  @ApiProperty({ example: 2 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'En curso' })
  @IsString()
  name: string;
}
