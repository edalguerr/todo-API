import { Controller, Get, Post, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from 'src/domain/entity/task';
import { SaveTaskRequestDTO } from '../../dto/task/request/save-task-request';
import { SaveTaskDTOtoEntity } from '../../mapper/task/DTOtoEntity/save-task';
import { StateService } from '../state/state.service';
import { SaveTaskEntityToDTO } from '../../mapper/task/EntityToDTO/save-task';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly stateService: StateService,
  ) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.app.list();
  }

  @Post()
  async save(
    @Body() taskRequest: SaveTaskRequestDTO,
  ): Promise<SaveTaskEntityToDTO> {
    const newTask = new SaveTaskDTOtoEntity(taskRequest);
    return new SaveTaskEntityToDTO(await this.taskService.app.save(newTask));
  }
}
