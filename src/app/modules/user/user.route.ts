/* eslint-disable no-unused-vars */
import express from 'express';
import { UserController } from './user.controller';
import { createStudentZodValidations } from '../student/student.validation';
import validateRequest from '../../middlwares/validationRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentZodValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema.TFacultyValidationSchema),
  UserController.createFaculty,
);

export const UserRoute = router;
