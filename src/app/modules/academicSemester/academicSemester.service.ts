import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemister.module';

const createAcademicSamesterIntoDB = async (payload: TAcademicSemester) => {
  const result = await AcademicSemester.create(payload);
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSamesterIntoDB,
};
