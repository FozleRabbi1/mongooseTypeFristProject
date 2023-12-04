/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSourse, TGenericErrorResponse } from '../globalInterface/error';

export const handleDublicateError = (err: any): TGenericErrorResponse => {
  // eslint-disable-next-line no-useless-escape
  const regex = /\"(.*?)\"/;
  const match = err?.message.match(regex);

  const errorSourse: TErrorSourse = [
    {
      path: '',
      message: `${match[1]} Is already exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID',
    errorSourse,
  };
};
