import { IsInt } from 'class-validator';

export class DeleteStateRequestDTO {
  @IsInt()
  id: number;
}
