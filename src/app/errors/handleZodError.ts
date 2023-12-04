import { ZodError, ZodIssue } from 'zod';
import { TErrorSourse, TGenericErrorResponse } from '../globalInterface/error';

export const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSourse: TErrorSourse = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorSourse,
  };
};
