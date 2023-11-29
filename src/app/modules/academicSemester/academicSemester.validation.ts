import { z } from 'zod';
import {
  AcademicSemesterName,
  AcademicsemesterCode,
  Months,
} from './academicSemester.constant';

const academicSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
    code: z.enum([...AcademicsemesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

export const AcademicSemesterValidations = {
  academicSemesterValidation,
};
