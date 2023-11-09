import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionMessages } from '../constants/exceptions';
import { NotFoundException } from '../exceptions/not-found-exception';

export function httpExceptionDispatcher(error: Error): void {
  if (error instanceof NotFoundException) {
    throw new HttpException(ExceptionMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
