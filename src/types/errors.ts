import { HTTP_STATUS } from './http-status';
class CustomError extends Error {
  constructor(
    message: string,
    protected status: number,
    protected errorType: string
  ) {
    super(message);
    this.status = status;
    this.errorType = errorType;
    Error.captureStackTrace(this, CustomError);
  }
}

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, HTTP_STATUS.BAD_REQUEST, 'BadRequestError');
  }
}

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, HTTP_STATUS.NOT_FOUND, 'NotFoundError');
  }
}

class MethodNotAllowedError extends CustomError {
  constructor(message: string) {
    super(message, HTTP_STATUS.METHOD_NOT_ALLOWED, 'MethodNotAllowedError');
  }
}

class ServerError extends CustomError {
  constructor(message: string) {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'ServerError');
  }
}

export { BadRequestError, NotFoundError, MethodNotAllowedError, ServerError };
