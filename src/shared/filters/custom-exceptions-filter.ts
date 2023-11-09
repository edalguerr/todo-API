import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException } from '../exceptions/base-exception';

@Catch(BaseException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.status;
    const message = exception.message;
    const internalCode = exception?.code || '';

    response.status(status).json({
      statusCode: status,
      message,
      internalCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
