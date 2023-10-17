import { Injectable } from '@nestjs/common';
import { StateService as StateServiceApplication } from 'src/application/state-service/state-service';
import { StateServiceAdapter } from 'src/infrastructure/adapter/state-service';

@Injectable()
export class StateService {
  private applicationService: StateServiceApplication;

  constructor(adapterService: StateServiceAdapter) {
    this.applicationService = new StateServiceApplication(adapterService);
  }

  get app(): StateServiceApplication {
    return this.applicationService;
  }
}
