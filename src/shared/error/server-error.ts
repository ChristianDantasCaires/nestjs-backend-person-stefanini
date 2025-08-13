import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorMessages } from "../enums/error-messages.enum";

class ServerError extends HttpException {
  constructor(
    message: ErrorMessages,
    statusCode: HttpStatus,
    data?: unknown,
  ) {
    super({ message, data: { ...data ?? {} }, success: false }, statusCode);
  }
}

export default ServerError;
