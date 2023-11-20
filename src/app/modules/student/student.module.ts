import { Schema, model } from 'mongoose';
import { Student, guardian, studentName } from './student.interface';

// =========================================================>> Schema
///===============================>>  sub Schema
const studentNameSchema = new Schema<studentName>({
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String },
});

///===============================>>  sub Schema
const guardianSchema = new Schema<guardian>({
  fatherName: { type: String, required: true },
  fatherOcuparion: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOcupation: { type: String, required: true },
  motheContactNo: { type: String, required: true },
});

///===============================>>  main Schema
const studentSchema = new Schema<Student>({
  studentId: { type: String },
  name: studentNameSchema,
  gender: ['male', 'female'],
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'B+', 'A-', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  premanentAddress: { type: String, required: true },
  gurdian: guardianSchema,
  profilImage: { type: String },
  isActive: ['active', 'deActive'],
});

// ============================================ >>>>  model

export const StudentModel = model<Student>('Student', studentSchema);
