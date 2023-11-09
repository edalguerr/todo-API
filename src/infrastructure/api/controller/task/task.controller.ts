import { Controller, Get, Post, Put, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from 'src/domain/entity/task';
import { SaveTaskRequestDTO } from '../../dto/task/request/save-task-request';
import { SaveTaskDTOtoEntity } from '../../mapper/task/DTOtoEntity/save-task';
import { SaveTaskEntityToDTO } from '../../mapper/task/EntityToDTO/save-task';
import { UpdateTaskRequestDTO } from '../../dto/task/request/update-task-request';
import { SaveTaskResponseDTO } from '../../dto/task/response/save-task-response';
import { UpdateTaskDTOtoEntity } from '../../mapper/task/DTOtoEntity/update-task';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.app.list();
  }

  @Post()
  async save(
    @Body() taskRequest: SaveTaskRequestDTO,
  ): Promise<SaveTaskResponseDTO> {
    const newTask = new SaveTaskDTOtoEntity(taskRequest);
    return new SaveTaskEntityToDTO(
      await this.taskService.app.save(
        newTask,
        taskRequest.stateId,
        taskRequest.categories,
      ),
    );
  }

  @Put()
  async update(
    @Body() taskRequest: UpdateTaskRequestDTO,
  ): Promise<SaveTaskResponseDTO> {
    const newTask = new UpdateTaskDTOtoEntity(taskRequest);
    return new SaveTaskEntityToDTO(
      await this.taskService.app.update(
        newTask,
        taskRequest.stateId,
        taskRequest.categories,
      ),
    );
  }
}
