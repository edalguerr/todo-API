import { IsString, IsInt } from 'class-validator';

export class UpdateStateRequestDTO {
  @IsInt()
  id: number;
  @IsString()
  name: string;
}
