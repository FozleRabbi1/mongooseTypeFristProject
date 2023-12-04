import { StudentServices } from './student.service';
import { sendResponse } from '../../utils/responst.send';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

// ========>>>>>>>>> get all  students
const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all student successfully',
    data: result,
  });
});

// ========>>>>>>>>> get single  student
const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromBD(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single student sucessfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.updateStudentFromBD(
    studentId,
    req?.body?.student,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update student sucessfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete data successfully',
    data: result,
  });
});

export const StudentControler = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
