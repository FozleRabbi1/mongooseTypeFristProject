/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Error } from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemister.module';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.module';
import { TUser } from './user.interface';
import { User } from './user.module';
import { generateAdminId, generateStudentId } from './user.utils';
import { AppError } from '../../errors/appError';
import httpStatus from 'http-status';
import { TFaculty } from '../Faculty/faculty.interface';
import { FacultyModel } from '../Faculty/faculty.module';
import { generateFacultuyId } from '../Faculty/faculty.utils';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Admin } from '../admin/admin.model';

// ============>>>> create student
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

// ============>>>> create faculty
const createFacultyIntoDB = async (password: string, paylod: TFaculty) => {
  const facultyData: Partial<TUser> = {};
  facultyData.password = password || (config.default_pass as string);
  facultyData.role = 'faculty';
  const isacademicDepartment = await AcademicDepartment.findById(
    paylod.academicDepartment,
  );
  if (!isacademicDepartment) {
    throw new Error('Academic Department not found');
  }
  const isFacultyExiest = await FacultyModel.findOne({
    email: paylod.email,
  });
  if (isFacultyExiest) {
    throw new Error('Faculty already exiestt');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    facultyData.id = await generateFacultuyId();

    const newUser = await User.create([facultyData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create user');
    }
    paylod.id = newUser[0].id;
    paylod.user = newUser[0]._id;
    const newFaculty = await FacultyModel.create([paylod], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create Faculty');
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

// ============>>>> create Admin
const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const UserService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
