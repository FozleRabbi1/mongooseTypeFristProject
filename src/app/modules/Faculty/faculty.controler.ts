import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/responst.send';
import { FacultyService } from './faculty.service';

const getALlFaculty = catchAsync(async (req, res) => {
  const result = await FacultyService.getALlFacultyFromDB(req?.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all faculty successfully',
    data: result,
  });
});

export const FacultyControler = {
  getALlFaculty,
};
