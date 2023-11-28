import { z } from 'zod';

const studentNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(5, { message: 'Minimum 5 characters' })
    .max(10)
    .trim(),
  middleName: z.string(),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father name is required' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father occupation is required' }),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father contact number is required' }),
  motherName: z.string().min(1, { message: 'Mother name is required' }),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother occupation is required' }),
  motherContactNo: z
    .string()
    .min(1, { message: 'Mother contact number is required' }),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    // id: z.string().min(1, { message: 'Student id is required' }),
    password: z
      .string()
      .max(20, { message: "password can't be 20 cherecters " }),
    student: z.object({
      name: studentNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().min(1, { message: 'Date of birth is required' }),
      email: z.string().min(1, { message: 'Email is required' }),
      contactNumber: z
        .string()
        .min(1, { message: 'Contact number is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
      bloodGroup: z.enum(['A+', 'B+', 'A-', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' }),
      premanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' }),
      gurdian: guardianValidationSchema,
      profilImage: z.string(),
      // isDeleted: z.boolean(),
      // isDeleted: z.boolean().default(false),
      // status: z.enum(['in-progress', 'block']).default('in-progress'),
    }),
  }),
});

export const createStudentZodValidations = {
  createStudentValidationSchema,
};
