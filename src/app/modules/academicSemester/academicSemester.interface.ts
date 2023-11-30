export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TAcademicSEmesterName = 'Autumn' | 'Summer' | 'Fall';
export type TAcademicSEmesterCode = '01' | '02' | '03';

export type TAcademicSemester = {
  name: TAcademicSEmesterName;
  code: TAcademicSEmesterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};

export type TAcademicSEmesterNameCodeMapper = {
  [key: string]: string;
};
