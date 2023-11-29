import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/responst.send';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSamester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSamesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSamester,
};
