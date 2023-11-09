import { CUSTOM_EXCEPTIONS, ExceptionTypes } from '../constants/exceptions';
import { BaseException } from './base-exception';

export class DefaultDependencyException extends BaseException {
  constructor(parentName: string) {
    const defaultDependencyExceptionObj =
      CUSTOM_EXCEPTIONS[ExceptionTypes.DEFAULT_DEPENDENCY];
    const message = defaultDependencyExceptionObj.message(parentName);
    super(message);
    this.status = defaultDependencyExceptionObj.statusCode;
    this.code = defaultDependencyExceptionObj.customCode;
  }
}
