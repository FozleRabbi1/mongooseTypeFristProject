//=========================>>>>>>>>>> create interface and export

import { Model, Types } from 'mongoose';

export type TstudentName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type Tguardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TstudentName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'B+' | 'A-' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  premanentAddress: string;
  gurdian: Tguardian;
  profilImage: string;
  isDeleted: boolean;
};

// for creating static

export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null>;
}

// export interface studentModel extends Model<TStudent> {
//   isUserExists(id: string): Promise<TStudent | null>;
// }

// ===========>> for creating instance
// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
