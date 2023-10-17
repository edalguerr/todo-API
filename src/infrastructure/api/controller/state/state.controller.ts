import { Body, Controller, Get, Post } from '@nestjs/common';
import { StateService } from './state.service';
import { State } from 'src/domain/entity/state';
import { StateResponseDTO } from '../../dto/state/response/state-response';
import { ListStatesEntityToDTO } from '../../mapper/state/EntityToDTO/list-states';
import { SaveStateRequestDTO } from '../../dto/state/request/save-state-request';
import { SaveStateDTOtoEntity } from '../../mapper/state/DTOtoEntity/save-state';
import { SaveStateEntityToDTO } from '../../mapper/state/EntityToDTO/save-state';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async list(): Promise<StateResponseDTO[]> {
    return new ListStatesEntityToDTO(await this.stateService.app.list())
      .statesList;
  }

  @Get('default')
  findDefault(): Promise<State> {
    return this.stateService.app.getDefaultState();
  }

  @Post()
  async save(
    @Body() state: SaveStateRequestDTO,
  ): Promise<SaveStateEntityToDTO> {
    return new SaveStateEntityToDTO(
      await this.stateService.app.save(new SaveStateDTOtoEntity(state)),
    );
  }
}
