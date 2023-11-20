import { Student } from './student.interface';
import { StudentModel } from './student.module';

// =====>> create student
const createStudentIntoDB = async (studen: Student) => {
  const result = await StudentModel.create(studen);
  return result;
};

// =====>> get all students
const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// =======>> get single student
const getSingleStudent = async (studentId: string | number) => {
  const result = await StudentModel.findOne({ studentId });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudent,
};
