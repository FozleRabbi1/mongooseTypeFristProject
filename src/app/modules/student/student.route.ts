import express from 'express';
import { StudentControler } from './student.controller';

const router = express.Router();

// ========>>> create student route
router.post('/create-student', StudentControler.createStudent);

// ========>>> get all students route
router.get('/', StudentControler.getAllStudents);

// ========>>> get single students route
router.get('/:studentId', StudentControler.getSingleStudent);

export const StudentRoutes = router;
