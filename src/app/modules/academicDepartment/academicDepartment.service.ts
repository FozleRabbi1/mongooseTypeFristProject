import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (paylod: TAcademicDepartment) => {
  // const isDepartmentExist = await AcademicDepartment.findOne({   // এই কাজ টা modle এর মধ্যে static use করেউ করা যাই
  //   name: paylod?.name,
  // });
  // if (isDepartmentExist) {
  //   throw new Error('department already exist');
  // }
  const result = await AcademicDepartment.create(paylod);
  return result;
};

const getAllAcademicDetartmentFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  paylod: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    paylod,
    { new: true },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDetartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
