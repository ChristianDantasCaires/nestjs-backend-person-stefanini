import { HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { ZodError } from "zod";
import z from "zod";
import ServerError from "../error/server-error";
import { ErrorMessages } from "../enums/error-messages.enum";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodType) { }

  transform(value: unknown) {
    try {
      this.schema.parse(value);
      return value;
    } catch (error) {
      console.log(error)
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.reduce((acc, issue) => {
          const path = issue.path.join('.') || 'unknown';
          acc[path] = issue.message;
          return acc;
        }, {} as Record<string, string>);

        throw new ServerError(
          ErrorMessages.ZOD_VALIDATION,
          HttpStatus.BAD_REQUEST,
          formattedErrors
        );
      }

      throw new ServerError(
        ErrorMessages.ZOD_VALIDATION,
        HttpStatus.BAD_REQUEST
      );

    }
  }
}