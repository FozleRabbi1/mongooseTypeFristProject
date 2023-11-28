import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';

const router = Router();

const moduleRouter = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
];
moduleRouter.forEach((SingleRoute) =>
  router.use(SingleRoute.path, SingleRoute.route),
);

export default router;
