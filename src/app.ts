import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

// perser
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  const b = 10;
  const c = 10;
  res.send({ a, b, c });
});

export default app;
