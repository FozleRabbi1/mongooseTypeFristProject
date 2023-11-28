import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.module';
import { TUser } from './user.interface';
import { User } from './user.module';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user Object
  const userData: Partial<TUser> = {};
  // set password == if password is not given , set default password
  userData.password = password || (config.default_pass as string);
  //set student role
  userData.role = 'student';
  // set manually generated id
  userData.id = '2023100003';

  const newUser = await User.create(userData);
  // create a student =======>>>  ( ekhane object.keys(result) === ei code object ke Array te convart korbe,,, then amar .length diye check korbo ekhane data successfully add hoyse ki na )
  if (Object.keys(newUser).length) {
    // set id, and _id as user
    studentData.id = newUser.id; // embedding id
    studentData.user = newUser._id; // reference Id

    //  create a student
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
