import { HttpStatus } from '@nestjs/common';
export enum ExceptionMessages {
  NOT_FOUND = 'Not found',
  BAD_REQUEST = 'Bad request',
  NESTED_DEPENDENCY = 'is being used',
  DEFAULT_DEPENDENCY = "Can't delete a default",
}

export enum ExceptionTypes {
  NOT_FOUND,
  BAD_REQUEST,
  NESTED_DEPENDENCY,
  DEFAULT_DEPENDENCY,
}

enum CustomExceptionCodes {
  NESTED_DEPENDENCY = 'Error-001',
  DEFAULT_DEPENDENCY = 'Error-002',
}

export const CUSTOM_EXCEPTIONS = Object.freeze({
  [ExceptionTypes.NOT_FOUND]: {
    message: ExceptionMessages.NOT_FOUND,
    statusCode: HttpStatus.NOT_FOUND,
  },
  [ExceptionTypes.NESTED_DEPENDENCY]: {
    message: (item: string) => `${item} ${ExceptionMessages.NESTED_DEPENDENCY}`,
    statusCode: HttpStatus.CONFLICT,
    customCode: CustomExceptionCodes.NESTED_DEPENDENCY,
  },
  [ExceptionTypes.DEFAULT_DEPENDENCY]: {
    message: (item: string) =>
      `${ExceptionMessages.DEFAULT_DEPENDENCY} ${item.toLowerCase()}`,
    statusCode: HttpStatus.CONFLICT,
    customCode: CustomExceptionCodes.DEFAULT_DEPENDENCY,
  },
});
