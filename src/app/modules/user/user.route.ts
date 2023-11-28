/* eslint-disable no-unused-vars */
import express from 'express';
import { UserController } from './user.controller';
import { createStudentZodValidations } from '../student/student.validation';
import validateRequest from '../../middlwares/validationRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentZodValidations.createStudentValidationSchema),
  UserController.createStudent,
);
export const UserRoute = router;
