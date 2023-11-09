import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { State } from '../dto/state';
import { Task } from '../dto/task';

@Injectable()
export class StateRepository extends Repository<State> {
  constructor(dataSource: DataSource) {
    super(State, dataSource.createEntityManager());
  }

  async getTaskById(stateId: number): Promise<Task[]> {
    return (
      (
        await this.findOne({
          where: {
            id: stateId,
          },
          relations: {
            tasks: true,
          },
        })
      )?.tasks || []
    );
  }
}
