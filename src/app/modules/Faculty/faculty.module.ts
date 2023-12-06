import { Schema, model } from 'mongoose';
import { TFaculty } from './faculty.interface';

const UserNameSchema = new Schema({
  firstName: { type: String, required: [true, 'First name is required'] },
  middleName: { type: String, required: [true, 'Middle name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
});

// Define the faculty schema
const FacultySchema = new Schema<TFaculty>(
  {
    id: { type: String, required: [true, 'ID is required'] },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      unique: true,
      ref: 'User',
    },
    designation: { type: String, required: [true, 'Designation is required'] },
    name: { type: UserNameSchema, required: [true, 'Name is required'] },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String },
    email: { type: String, required: [true, 'Email is required'] },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    profileImg: { type: String },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// Create the Mongoose model
export const FacultyModel = model<TFaculty>('Faculty', FacultySchema);

// {
//     "id": "123",
//     "user": "user_id_placeholder", // Replace with an actual ObjectId
//     "designation": "Professor",
//     "name": {
//       "firstName": "John",
//       "middleName": "Doe",
//       "lastName": "Smith"
//     },
//     "gender": "male",
//     "dateOfBirth": "1990-01-01", // Example date format, adjust as needed
//     "email": "john.doe@example.com",
//     "contactNo": "1234567890",
//     "emergencyContactNo": "9876543210",
//     "bloodGroup": "A+",
//     "presentAddress": "123 Main Street, Cityville",
//     "profileImg": "profile-image-url",
//     "isDeleted": false
//   }
