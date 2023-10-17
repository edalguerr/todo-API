import { IsString } from 'class-validator';

export class SaveStateRequestDTO {
  @IsString()
  name: string;
}
