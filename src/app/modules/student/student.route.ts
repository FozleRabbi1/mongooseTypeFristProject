import express from 'express';
import { StudentControler } from './student.controller';

const router = express.Router();

// ========>>> get all students route
router.get('/', StudentControler.getAllStudents);

// ========>>> get single students route
router.get('/:id', StudentControler.getSingleStudent);

// ========>>> delete students route
router.delete('/:id', StudentControler.deleteStudent);

export const StudentRoutes = router;
