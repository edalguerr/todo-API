import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { StateRepository } from 'src/infrastructure/repository/repository/state-repository';
import { StateServiceAdapter } from 'src/infrastructure/adapter/state-service';

@Module({
  controllers: [StateController],
  providers: [StateService, StateRepository, StateServiceAdapter],
  exports: [StateService],
})
export class StateModule {}
