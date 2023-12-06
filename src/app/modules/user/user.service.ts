/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemister.module';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.module';
import { TUser } from './user.interface';
import { User } from './user.module';
import { generateStudentId } from './user.utils';
import { AppError } from '../../errors/appError';
import httpStatus from 'http-status';
import { TFaculty } from '../Faculty/faculty.interface';
import { FacultyModel } from '../Faculty/faculty.module';
import { generateFacultuyId } from '../Faculty/faculty.utils';

const createStudentIntoDB = async (password: string, paylod: TStudent) => {
  // create a user Object
  const userData: Partial<TUser> = {};
  // set password == if password is not given , set default password
  userData.password = password || (config.default_pass as string);
  //set student role
  userData.role = 'student';
  const admissionSemester = await AcademicSemester.findById(
    paylod.admissionSemester,
  );

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );
    // ====  ( create a user == transaction - 1)
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'faild to create user');
    }
    // set id, and _id as user
    paylod.id = newUser[0].id;
    paylod.user = newUser[0]._id;
    // ====  ( create a student == transaction - 2)
    const newStudent = await Student.create([paylod], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'faild to create student');
    }
    await session.commitTransaction(); // commit korle ba commitTransaction() sahajje data parmanently database a save hoye jai
    await session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyIntoDB = async (password: string, paylod: TFaculty) => {
  const facultyData: Partial<TUser> = {};
  facultyData.password = password || (config.default_pass as string);
  facultyData.role = 'faculty';
  facultyData.id = await generateFacultuyId();
  const newUser = await User.create(facultyData);
  if (Object.keys(newUser).length) {
    paylod.id = newUser.id;
    paylod.user = newUser._id;
    const result = await FacultyModel.create(paylod);
    return result;
  }
};

export const UserService = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
