import { z } from 'zod';

const createStudentNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(5, { message: 'Minimum 5 characters' })
    .max(10)
    .trim(),
  middleName: z.string(),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});

const createGuardianValidationSchema = z.object({
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
      name: createStudentNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
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
      gurdian: createGuardianValidationSchema,
      profilImage: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      isDeleted: z.boolean().default(false),
      // isDeleted: z.boolean(),
      // status: z.enum(['in-progress', 'block']).default('in-progress'),
    }),
  }),
});

const updateStudentNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(5, { message: 'Minimum 5 characters' })
    .max(10)
    .trim()
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last name is required' }).optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(1, { message: 'Father name is required' })
    .optional(),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father occupation is required' })
    .optional(),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father contact number is required' })
    .optional(),
  motherName: z
    .string()
    .min(1, { message: 'Mother name is required' })
    .optional(),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother occupation is required' })
    .optional(),
  motherContactNo: z
    .string()
    .min(1, { message: 'Mother contact number is required' })
    .optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    // password: z
    //   .string()
    //   .max(20, { message: "password can't be 20 characters " })
    //   .optional(),
    student: z.object({
      name: updateStudentNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().min(1, { message: 'Email is required' }).optional(),
      contactNumber: z
        .string()
        .min(1, { message: 'Contact number is required' })
        .optional(),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' })
        .optional(),
      bloodGroup: z
        .enum(['A+', 'B+', 'A-', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .min(1, { message: 'Present address is required' })
        .optional(),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' })
        .optional(),
      guardian: updateGuardianValidationSchema.optional(),
      profilImage: z.string().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
      isDeleted: z.boolean().default(false).optional(),
    }),
  }),
});

export const createStudentZodValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
