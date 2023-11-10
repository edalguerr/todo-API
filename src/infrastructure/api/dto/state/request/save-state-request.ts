import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SaveStateRequestDTO {
  @ApiProperty({ example: 'En curso' })
  @IsString()
  name: string;
}
