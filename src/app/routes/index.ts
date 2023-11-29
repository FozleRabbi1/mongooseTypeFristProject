import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRouters } from '../modules/academicSemester/academicSemester.route';

const router = Router();

const moduleRouters = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRouters,
  },
];
moduleRouters.forEach((SingleRoute) =>
  router.use(SingleRoute.path, SingleRoute.route),
);

export default router;
