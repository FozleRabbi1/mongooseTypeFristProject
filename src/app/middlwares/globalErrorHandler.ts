/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, nex) => {
  let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Something went wrong';

  type TErrorSourse = {
    path: string | number;
    message2: string;
  }[];

  let errorSourse: TErrorSourse = [
    {
      path: '',
      message2: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'this is zod error';
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSourse,
    error: err,
  });
};
