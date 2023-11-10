import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SaveCategoryRequestDTO {
  @ApiProperty({ example: 'Work' })
  @IsString()
  name: string;
}
