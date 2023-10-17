import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}
  getHello(): string {
    return 'Hello World!';
  }

  listTasks() {
    return 'Hello World! lists';
  }
}
