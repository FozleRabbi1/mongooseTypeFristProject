import { QueryBuilder } from '../../builder/QueryBuilder';
import { facultySearchableFild } from './faculty.constant';
import { FacultyModel } from './faculty.module';

const getALlFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    FacultyModel.find().populate('academicDepartment'),
    query,
  )
    .search(facultySearchableFild)
    .fields()
    .filter()
    .sort();
  const result = await facultyQuery.modelQuery;
  return result;
};

export const FacultyService = {
  getALlFacultyFromDB,
};
