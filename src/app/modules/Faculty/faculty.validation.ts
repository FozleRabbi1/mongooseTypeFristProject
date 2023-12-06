import { z } from 'zod';

const TUserValidationNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'firstName name is required' })
    .trim(),
  middleName: z.string(),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});

// Define validation schema for TFaculty
export const TFacultyValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .max(20, { message: "password can't be 20 cherecters " }),

    faculty: z.object({
      designation: z.string().min(1, { message: 'designation  is required' }),
      name: TUserValidationNameSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email({ message: 'Please provide a valid email address' }),
      contactNo: z
        .string()
        .min(1, { message: 'Please provide a valid contact number' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Please provide a valid emergency Contac number' }),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string(),
      profileImg: z.string().optional(),
      academicDepartment: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const createFacultyValidationSchema = {
  TFacultyValidationSchema,
};
