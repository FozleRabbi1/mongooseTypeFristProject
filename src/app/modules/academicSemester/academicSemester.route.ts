import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlwares/validationRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

router.get('/', AcademicSemesterControllers.getALlAcademicSemester);
router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidations.academicSemesterValidation),
  AcademicSemesterControllers.createAcademicSamester,
);
router.get('/:semesterId', AcademicSemesterControllers.getSingleAcademicData);
router.patch(
  '/:semesterId',
  validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidation),
  AcademicSemesterControllers.updateSingleAcademicData,
);

export const AcademicSemesterRouters = router;
