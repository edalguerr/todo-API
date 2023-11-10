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
import { SaveTaskRequestDTO } from '../../dto/task/request/save-task-request';
import { SaveTaskDTOtoEntity } from '../../mapper/task/DTOtoEntity/save-task';
import { SaveTaskEntityToDTO } from '../../mapper/task/EntityToDTO/save-task';
import { UpdateTaskRequestDTO } from '../../dto/task/request/update-task-request';
import { SaveTaskResponseDTO } from '../../dto/task/response/save-task-response';
import { UpdateTaskDTOtoEntity } from '../../mapper/task/DTOtoEntity/update-task';
import { DeleteTaskRequestDTO } from '../../dto/task/request/delete-task';
import { ExceptionMessages } from 'src/shared/constants/exceptions';
import { FilterTaskRequestDTO } from '../../dto/task/request/filter-task';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateTaskResponseDTO } from '../../dto/task/response/update-task-response';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({
    summary: 'Get all tasks',
    description: 'Return a task list',
  })
  @ApiResponse({
    status: 200,
    description: 'Task list',
    type: [UpdateTaskResponseDTO],
  })
  @Get()
  findAll(): Promise<UpdateTaskResponseDTO[]> {
    return this.taskService.app.list();
  }

  @ApiOperation({
    summary: 'Save task',
    description: 'Create a new task',
  })
  @ApiResponse({
    status: 200,
    description: 'Task saved',
    type: SaveTaskResponseDTO,
  })
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

  @ApiOperation({
    summary: 'Update task',
    description: 'Update task',
  })
  @ApiResponse({
    status: 200,
    description: 'Task updated',
    type: SaveTaskResponseDTO,
  })
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

  @ApiOperation({
    summary: 'Get task by id',
    description: 'Get task by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Return a task',
    type: UpdateTaskResponseDTO,
  })
  @Get(':id')
  findById(@Param('id') id: number): Promise<UpdateTaskResponseDTO> {
    if (isNaN(id)) {
      throw new HttpException(
        ExceptionMessages.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.taskService.app.getTaskById(id);
  }

  @ApiOperation({
    summary: 'Filter tasks',
    description: 'Search task by various criteria',
  })
  @ApiResponse({
    status: 200,
    description: 'Return a task list',
    type: UpdateTaskResponseDTO,
  })
  @Post('filter')
  filter(
    @Body() filterRequest: FilterTaskRequestDTO,
  ): Promise<UpdateTaskResponseDTO[]> {
    return this.taskService.app.filter(filterRequest);
  }

  @ApiOperation({
    summary: 'Delete task',
    description: 'Delete task',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the task deleted',
    type: SaveTaskResponseDTO,
  })
  @Delete()
  async delete(
    @Body() taskRequest: DeleteTaskRequestDTO,
  ): Promise<SaveTaskResponseDTO> {
    return new SaveTaskEntityToDTO(
      await this.taskService.app.delete(taskRequest.id),
    );
  }
}
