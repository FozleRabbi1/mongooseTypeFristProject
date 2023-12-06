/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '../user/user.module';

const findLastFacultyId = async () => {
  const lastFaculry = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculry?.id ? lastFaculry.id : undefined;
};

export const generateFacultuyId = async () => {
  let currentId = (0).toString();
  const lastFaculry = await findLastFacultyId();
  if (!lastFaculry) {
    currentId = currentId.padStart(4, '0');
  } else {
    currentId = lastFaculry.substring(2, 6);
  }
  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  const incrementNewId = 'F-' + incrementId;
  return incrementNewId;
};
