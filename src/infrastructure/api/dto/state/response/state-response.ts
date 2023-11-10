import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsBoolean } from 'class-validator';

export class StateResponseDTO {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'Por hacer' })
  @IsString()
  name: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isDefault: boolean;
}
