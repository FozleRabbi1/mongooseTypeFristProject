import mongoose from 'mongoose';
import { TErrorSourse, TGenericErrorResponse } from '../globalInterface/error';

export const mongooseValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSourse: TErrorSourse = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorSourse,
  };
};
