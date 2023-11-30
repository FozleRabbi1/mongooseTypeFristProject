import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/responst.send';
import { AcademicSemesterServices } from './academicSemester.service';

const getALlAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester all data get successfully ',
    data: result,
  });
});

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

const getSingleAcademicData = catchAsync(async (req, res) => {
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterDataFromDB(
      req?.params?.semesterId,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester fatched successfully',
    data: result,
  });
});

const updateSingleAcademicData = catchAsync(async (req, res) => {
  const result =
    await AcademicSemesterServices.updateSIngleAcademicSemesterData(
      req?.params?.semesterId,
      req?.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic data update SuccessFully ',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSamester,
  getALlAcademicSemester,
  getSingleAcademicData,
  updateSingleAcademicData,
};
