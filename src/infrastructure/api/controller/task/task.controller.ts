import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from 'src/domain/entity/task';
import { SaveTaskRequestDTO } from '../../dto/task/request/save-task-request';
import { SaveTaskDTOtoEntity } from '../../mapper/task/DTOtoEntity/save-task';
import { SaveTaskEntityToDTO } from '../../mapper/task/EntityToDTO/save-task';
import { UpdateTaskRequestDTO } from '../../dto/task/request/update-task-request';
import { SaveTaskResponseDTO } from '../../dto/task/response/save-task-response';
import { UpdateTaskDTOtoEntity } from '../../mapper/task/DTOtoEntity/update-task';
import { DeleteTaskRequestDTO } from '../../dto/task/request/delete-task';
import { ExceptionMessages } from 'src/shared/constants/exceptions';
import { FilterTaskRequestDTO } from '../../dto/task/request/filter-task';

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

  @Get(':id')
  findById(@Param('id') id: number): Promise<Task> {
    if (isNaN(id)) {
      throw new HttpException(
        ExceptionMessages.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.taskService.app.getTaskById(id);
  }

  @Post('filter')
  filter(@Body() filterRequest: FilterTaskRequestDTO): Promise<Task[]> {
    return this.taskService.app.filter(filterRequest);
  }

  @Delete()
  async delete(
    @Body() taskRequest: DeleteTaskRequestDTO,
  ): Promise<SaveTaskResponseDTO> {
    return new SaveTaskEntityToDTO(
      await this.taskService.app.delete(taskRequest.id),
    );
  }
}
