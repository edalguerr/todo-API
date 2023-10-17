import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { State } from '../dto/state';

@Injectable()
export class StateRepository extends Repository<State> {
  constructor(dataSource: DataSource) {
    super(State, dataSource.createEntityManager());
  }
}
