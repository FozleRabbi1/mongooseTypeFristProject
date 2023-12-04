/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSourse } from '../globalInterface/error';
import config from '../config';
import { handleZodError } from '../errors/handleZodError';
import { mongooseValidationError } from '../errors/mongooseValidationError';
import { handleCastError } from '../errors/handleCastError';
import { handleDublicateError } from '../errors/handleDublicateError';
import { AppError } from '../errors/appError';

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, nex) => {
  let statusCode = 500;
  let message = err.message || 'Something went wrong';
  let errorSourse: TErrorSourse = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiError = handleZodError(err);
    statusCode = simplifiError?.statusCode;
    message = simplifiError?.message;
    errorSourse = simplifiError?.errorSourse;
  } else if (err.name === 'ValidationError') {
    const simplifiError = mongooseValidationError(err);
    statusCode = simplifiError?.statusCode;
    message = simplifiError?.message;
    errorSourse = simplifiError?.errorSourse;
  } else if (err.name === 'CastError') {
    const simplifiError = handleCastError(err);
    statusCode = simplifiError?.statusCode;
    message = simplifiError?.message;
    errorSourse = simplifiError?.errorSourse;
  } else if (err.code === 11000) {
    const simplifiError = handleDublicateError(err);
    statusCode = simplifiError?.statusCode;
    message = simplifiError?.message;
    errorSourse = simplifiError?.errorSourse;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSourse = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSourse = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSourse,
    // err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};
