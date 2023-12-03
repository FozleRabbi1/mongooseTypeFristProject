import express from 'express';
import { StudentControler } from './student.controller';
import validateRequest from '../../middlwares/validationRequest';
import { createStudentZodValidations } from './student.validation';

const router = express.Router();

// ========>>> get all students route
router.get('/', StudentControler.getAllStudents);

// ========>>> get single students route
router.get('/:studentId', StudentControler.getSingleStudent);

router.patch(
  '/:studentId',
  validateRequest(createStudentZodValidations.updateStudentValidationSchema),
  StudentControler.updateStudent,
);

// ========>>> delete students route
router.delete('/:studentId', StudentControler.deleteStudent);

export const StudentRoutes = router;
