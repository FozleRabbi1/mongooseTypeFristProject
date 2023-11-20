import { Request, Response } from 'express';
import { StudentServices } from './student.service';

// ========>>>>>>>>> create student
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const result = await StudentServices.createStudentIntoDB(studentData);
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// ========>>>>>>>>> get all  students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'get all student successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// ========>>>>>>>>> get single  student
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudent(studentId);
    res.status(200).json({
      sucess: true,
      message: 'get single student sucessfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControler = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
