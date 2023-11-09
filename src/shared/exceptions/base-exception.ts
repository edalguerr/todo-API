export class BaseException extends Error {
  status: any;
  name: string;
  code: string;

  constructor(message) {
    super(message);
  }
}
