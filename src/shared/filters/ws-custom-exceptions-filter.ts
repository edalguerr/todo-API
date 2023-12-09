import { Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { BaseException } from '../exceptions/base-exception';

@Catch(BaseException, BadRequestException)
export class WSCustomExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient();
    const request = ctx.getData();
    const status = exception.status;
    const message = exception.message;
    const internalCode = exception?.code || '';

    client.emit('error', {
      statusCode: status,
      message,
      internalCode,
      timestamp: new Date().toISOString(),
      data: request,
    });
  }
}
