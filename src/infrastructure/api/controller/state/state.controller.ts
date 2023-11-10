import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StateService } from './state.service';
import { StateResponseDTO } from '../../dto/state/response/state-response';
import { ListStatesEntityToDTO } from '../../mapper/state/EntityToDTO/list-states';
import { SaveStateRequestDTO } from '../../dto/state/request/save-state-request';
import { SaveStateDTOtoEntity } from '../../mapper/state/DTOtoEntity/save-state';
import { SaveStateEntityToDTO } from '../../mapper/state/EntityToDTO/save-state';
import { UpdateStateRequestDTO } from '../../dto/state/request/update-state-request';
import { UpdateStateDTOtoEntity } from '../../mapper/state/DTOtoEntity/update-state';
import { UpdateStateEntityToDTO } from '../../mapper/state/EntityToDTO/update-state';
import { StateEntityToDTO } from '../../mapper/state/EntityToDTO/state';
import { DeleteStateRequestDTO } from '../../dto/state/request/delete-state-request';
import { ExceptionMessages } from 'src/shared/constants/exceptions';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateTaskResponseDTO } from '../../dto/task/response/update-task-response';

@ApiTags('State')
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @ApiOperation({
    summary: 'Get all states',
    description: 'Return a state list',
  })
  @ApiResponse({
    status: 200,
    description: 'State list',
    type: [StateResponseDTO],
  })
  @Get()
  async list(): Promise<StateResponseDTO[]> {
    return new ListStatesEntityToDTO(await this.stateService.app.list())
      .statesList;
  }

  @ApiOperation({
    summary: 'Get default state',
    description: 'Get default state',
  })
  @ApiResponse({
    status: 200,
    description: 'Default state',
    type: StateResponseDTO,
  })
  @Get('default')
  findDefault(): Promise<StateResponseDTO> {
    return this.stateService.app.getDefaultState();
  }

  @ApiOperation({
    summary: 'Get state by id',
    description: 'Get state by id',
  })
  @ApiResponse({
    status: 200,
    description: 'State',
    type: StateResponseDTO,
  })
  @Get(':id')
  findById(@Param('id') id: number): Promise<StateResponseDTO> {
    if (isNaN(id)) {
      throw new HttpException(
        ExceptionMessages.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.stateService.app.getStateById(id);
  }

  @ApiOperation({
    summary: 'Get tasks by stateId',
    description: 'Get tasks by stateId',
  })
  @ApiResponse({
    status: 200,
    description: 'Task list',
    type: [UpdateTaskResponseDTO],
  })
  @Get(':id/task')
  findTaskByStateId(@Param('id') id: number): Promise<UpdateTaskResponseDTO[]> {
    if (isNaN(id)) {
      throw new HttpException(
        ExceptionMessages.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.stateService.app.getTasks(id);
  }

  @ApiOperation({
    summary: 'Save state',
    description: 'Create new state',
  })
  @ApiResponse({
    status: 200,
    description: 'State saved',
    type: StateResponseDTO,
  })
  @Post()
  async save(@Body() state: SaveStateRequestDTO): Promise<StateResponseDTO> {
    return new SaveStateEntityToDTO(
      await this.stateService.app.save(new SaveStateDTOtoEntity(state)),
    );
  }

  @ApiOperation({
    summary: 'Update state',
    description: 'Update state',
  })
  @ApiResponse({
    status: 200,
    description: 'State updated',
    type: StateResponseDTO,
  })
  @Put()
  async update(
    @Body() state: UpdateStateRequestDTO,
  ): Promise<StateResponseDTO> {
    return new UpdateStateEntityToDTO(
      await this.stateService.app.update(new UpdateStateDTOtoEntity(state)),
    );
  }

  @ApiOperation({
    summary: 'Delete state',
    description: 'Delete state',
  })
  @ApiResponse({
    status: 200,
    description: 'Return the state deleted',
    type: StateResponseDTO,
  })
  @Delete()
  async delete(
    @Body() state: DeleteStateRequestDTO,
  ): Promise<StateResponseDTO> {
    return new StateEntityToDTO(await this.stateService.app.delete(state.id));
  }
}
