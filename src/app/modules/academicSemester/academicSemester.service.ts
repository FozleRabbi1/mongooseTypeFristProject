/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { academicSEmesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemister.module';
import { AppError } from '../../errors/appError';
// import httpStatus from 'http-status';

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const createAcademicSamesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSEmesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(400, 'Invalid semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getSingleAcademicSemesterDataFromDB = async (id: string) => {
  // const result = await AcademicSemester.findById(id);
  const result = await AcademicSemester.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
  ]);
  return result;
};

const updateSIngleAcademicSemesterData = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSEmesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSamesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterDataFromDB,
  updateSIngleAcademicSemesterData,
};
