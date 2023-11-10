import { IsInt } from 'class-validator';

export class DeleteTaskRequestDTO {
  @IsInt()
  id: number;
}
