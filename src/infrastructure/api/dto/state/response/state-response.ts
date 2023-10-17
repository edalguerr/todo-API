import { IsString, IsInt, IsBoolean } from 'class-validator';

export class StateResponseDTO {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsBoolean()
  isDefault: boolean;
}
