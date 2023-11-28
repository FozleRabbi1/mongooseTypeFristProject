import { Student } from './student.module';

// =====>> create student

// =====>> get all students
const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

// =======>> get single student
const getSingleStudentFromBD = async (id: string | number) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromBD,
  deleteStudentFromDB,
};
