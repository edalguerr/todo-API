import { CUSTOM_EXCEPTIONS, ExceptionTypes } from '../constants/exceptions';
import { BaseException } from './base-exception';

export class DependencyException extends BaseException {
  constructor(parentName: string) {
    const nestedExceptionObj =
      CUSTOM_EXCEPTIONS[ExceptionTypes.NESTED_DEPENDENCY];
    const message = nestedExceptionObj.message(parentName);
    super(message);
    this.status = nestedExceptionObj.statusCode;
    this.code = nestedExceptionObj.customCode;
  }
}
