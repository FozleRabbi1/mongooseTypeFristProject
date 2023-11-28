import express, { Application } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlwares/globalErrorHandler';
import { notFuond } from './app/middlwares/notFound';
import router from './app/routes';

const app: Application = express();

// perser
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

// middlware api's
app.use(globalErrorHandler);
app.use(notFuond);

export default app;
