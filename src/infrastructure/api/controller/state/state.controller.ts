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
import { Task } from 'src/domain/entity/task';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async list(): Promise<StateResponseDTO[]> {
    return new ListStatesEntityToDTO(await this.stateService.app.list())
      .statesList;
  }

  @Get('default')
  findDefault(): Promise<StateResponseDTO> {
    return this.stateService.app.getDefaultState();
  }

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

  @Get(':id/task')
  findTaskByStateId(@Param('id') id: number): Promise<Task[]> {
    if (isNaN(id)) {
      throw new HttpException(
        ExceptionMessages.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.stateService.app.getTasks(id);
  }

  @Post()
  async save(
    @Body() state: SaveStateRequestDTO,
  ): Promise<SaveStateEntityToDTO> {
    return new SaveStateEntityToDTO(
      await this.stateService.app.save(new SaveStateDTOtoEntity(state)),
    );
  }

  @Put()
  async update(
    @Body() state: UpdateStateRequestDTO,
  ): Promise<StateResponseDTO> {
    return new UpdateStateEntityToDTO(
      await this.stateService.app.update(new UpdateStateDTOtoEntity(state)),
    );
  }

  @Delete()
  async delete(
    @Body() state: DeleteStateRequestDTO,
  ): Promise<StateResponseDTO> {
    return new StateEntityToDTO(await this.stateService.app.delete(state.id));
  }
}
