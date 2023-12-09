import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { StateService } from '../../controller/state/state.service';
import { SaveStateRequestDTO } from '../../dto/state/request/save-state-request';
import { SaveStateEntityToDTO } from '../../mapper/state/EntityToDTO/save-state';
import { SaveStateDTOtoEntity } from '../../mapper/state/DTOtoEntity/save-state';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { WSExceptionFilter } from 'src/shared/filters/ws-exception-filter';
import { WSCustomExceptionFilter } from 'src/shared/filters/ws-custom-exceptions-filter';

const baseTopic: string = 'state';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(WSExceptionFilter, WSCustomExceptionFilter)
@UsePipes(ValidationPipe)
export class StateGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private stateService: StateService) {}

  afterInit(server: Server) {
    console.log('State server started' + server?.path());
  }

  handleConnection() {
    console.log('State client connected');
  }

  handleDisconnect() {
    console.log('State client disconnected');
  }

  @SubscribeMessage(`${baseTopic}`)
  async save(@MessageBody() state: SaveStateRequestDTO) {
    const savedState = new SaveStateEntityToDTO(
      await this.stateService.app.save(new SaveStateDTOtoEntity(state)),
    );

    this.server.emit('state/list', await this.stateService.app.list());
    return savedState;
  }

  @SubscribeMessage(`${baseTopic}/update`)
  update(@MessageBody() data: string): string {
    console.log('WS: Identity');
    console.log(data);

    return data;
  }
}
