import { StudentServices } from './student.service';
import { sendResponse } from '../../utils/responst.send';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

// ========>>>>>>>>> get all  students
const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all student successfully',
    data: result,
  });
});

// ========>>>>>>>>> get single  student
const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromBD(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single student sucessfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(id);
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
};
