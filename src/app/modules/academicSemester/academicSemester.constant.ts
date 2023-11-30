import {
  TAcademicSEmesterCode,
  TAcademicSEmesterName,
  TAcademicSEmesterNameCodeMapper,
  TMonths,
} from './academicSemester.interface';

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemesterName: TAcademicSEmesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const AcademicsemesterCode: TAcademicSEmesterCode[] = ['01', '02', '03'];

export const academicSEmesterNameCodeMapper: TAcademicSEmesterNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
