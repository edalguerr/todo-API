import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WSExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient();
    const request = ctx.getData();
    const name = exception.name;
    const message = exception.message;
    const error = exception.getError();

    client.emit('error', {
      name,
      message,
      error,
      timestamp: new Date().toISOString(),
      data: request,
    });
  }
}
