import express from 'express';
import { FacultyControler } from './faculty.controler';

const router = express.Router();

// ========>>> get all students route
router.get('/', FacultyControler.getALlFaculty);

// // ========>>> get single students route
// router.get('/:studentId', StudentControler.getSingleStudent);

// router.patch(
//   '/:studentId',
//   validateRequest(createStudentZodValidations.updateStudentValidationSchema),
//   StudentControler.updateStudent,
// );

// // ========>>> delete students route
// router.delete('/:studentId', StudentControler.deleteStudent);

export const FacultyRoutes = router;
