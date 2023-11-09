import { CUSTOM_EXCEPTIONS, ExceptionTypes } from '../constants/exceptions';
import { BaseException } from './base-exception';

export class NotFoundException extends BaseException {
  constructor(
    message: string = CUSTOM_EXCEPTIONS[ExceptionTypes.NOT_FOUND].message,
  ) {
    super(message);
    this.status = CUSTOM_EXCEPTIONS[ExceptionTypes.NOT_FOUND].statusCode;
  }
}
