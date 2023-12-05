import mongoose from 'mongoose';
import { Student } from './student.module';
import { User } from '../user/user.module';
import { AppError } from '../../errors/appError';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { studentSearchableFild } from './student.constent';

// =====>> create student

// =====>> get all students
const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFild)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;

  // console.log('base query', query);
  // const queryObj = { ...query }; // main data theke copy kora hoyeche
  // let searchTerm = '';
  // if (query.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or: studentSearchableFild.map((field) =>
  //     // {email : {$regex : query.searchTerm, $options : "i"}}
  //     ({ [field]: { $regex: searchTerm, $options: 'i' } }),
  //   ),
  // });
  // Filtering
  // const excludeFilds = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFilds.forEach((el) => delete queryObj[el]);
  // const filterQuery = searchQuery
  //   // যেই data গুলো main data fields এর সাথে exact match করে শুধু ঐ সমস্ত data-ই  queryObj এ আছে আর ঐ গুলোই find করবে
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });
  //descending
  // let sort = '-createdAt';
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);
  // let limit = 2;
  // let page = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);
  //============================>>>>>>>>>>>>>>  field limiting
  // let fields = '-__v';
  // // const projection: { [key: string]: 1 } = {};
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  //   // fields = query.fields as string;             // ei vabe korleu hobe
  //   // fields.split(',').forEach((field) => {
  //   //   projection[field] = 1;
  //   // });
  // }
  // const fieldsQuery = await limitQuery.select(fields);
  // const fieldsQuery = await limitQuery.select(projection);
  // return fieldsQuery;
};

// =======>> get single student
const getSingleStudentFromBD = async (id: string | number) => {
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  // const result = await Student.findById(id)
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentFromBD = async (id: string, payload: Partial<TStudent>) => {
  const { name, gurdian, ...remainingStudentData } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  if (gurdian && Object.keys(gurdian).length) {
    for (const [key, value] of Object.entries(gurdian)) {
      modifiedUpdateData[`gurdian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Faild to deleted student');
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromBD,
  deleteStudentFromDB,
  updateStudentFromBD,
};
