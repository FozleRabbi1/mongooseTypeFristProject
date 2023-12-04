import { TErrorSourse, TGenericErrorResponse } from '../globalInterface/error';
import mongoose from 'mongoose';

export const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSourse: TErrorSourse = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID',
    errorSourse,
  };
};
