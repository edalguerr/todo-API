import { Module } from '@nestjs/common';
import { StateGateway } from './state.gateway';
import { StateModule } from '../../controller/state/state.module';

@Module({
  imports: [StateModule],
  providers: [StateGateway],
  exports: [StateGateway],
})
export class StateGatewayModule {}
