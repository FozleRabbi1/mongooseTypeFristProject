import { Schema, model } from 'mongoose';
import {
  StudentModel,
  TStudent,
  Tguardian,
  TstudentName,
} from './student.interface';
const studentNameSchema = new Schema<TstudentName>({
  firstName: {
    type: String,
    required: [true, 'You must add your first name'],
    minlength: [5, 'minimum 5 carecter'],
    maxlength: 10,
    trim: true,
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
});

// Sub Schema
const guardianSchema = new Schema<Tguardian>({
  fatherName: { type: String, required: [true, 'Father name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required'],
  },
  motherName: { type: String, required: [true, 'Mother name is required'] },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required'],
  },
});

//======>>>  Main Schema
// ==>> instance method
// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
// ==>> static method
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required'],
      unique: true,
      ref: 'User', /// ref er sahajje user er sathe ei property er connection ghotbe  ( M=11.11 = vdo = 5.20)
    },
    name: {
      type: studentNameSchema,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "* {VALUE} * is not accepted. The gender field can only be one of the following: 'male', 'female' or 'other'",
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'B+', 'A-', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    premanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    gurdian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    profilImage: { type: String },
    admissionSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester' },
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

// virtual  (data base a exist nai but clint a ta show korbe,,, ekhane virtual fulll name k pathabe ,,, but DB te full name fild nai)
studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName} `;
});

// ========>>> delete query meddileware / hook
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// ===    ( + )
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// ==>> aggregate     [ { '$match': { id: 'S123471' } } ]
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// =========>>> pre save meddileWare / hook
// studentSchema.pre('save', async function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bycript_salt_round),
//   );
//   next();
// });
// // ==========>>> post save meddileWare / hook
// // studentSchema.post('save', function (document, next) {
// //   document.password = '';
// //   next();
// // });

// studentSchema.set('toJSON', {
//   transform: function (document, upData) {
//     delete upData.password;
//     return upData;
//   },
// });

// =====>> static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// ========>>> creating a custom constance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };
// Model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
