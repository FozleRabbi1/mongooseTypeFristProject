// import express, { Application, Request, Response } from 'express';
import express, { Application } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
const app: Application = express();

// perser
app.use(express.json());
app.use(cors());

//(Route API)  /api/v1/students/create-student        // Students all CRUD Operations API's
app.use('/api/v1/students', StudentRoutes);

// app.get('/', (req: Request, res: Response) => {
//   res.send();
// });

export default app;
