/* eslint-disable no-unused-vars */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlwares/globalErrorHandler';
import { notFuond } from './app/middlwares/notFound';
import router from './app/routes';

const app: Application = express();

// perser
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const test = async (req: Request, res: Response) => {
  //   Promise.reject();
};
app.get('/', test);
// middlware api's
app.use(globalErrorHandler);
app.use(notFuond);

export default app;
