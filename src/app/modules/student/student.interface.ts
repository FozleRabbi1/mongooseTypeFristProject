//=========================>>>>>>>>>> create interface and export

export type studentName = {
  firstName: string;
  middleName: string;
  lastName?: string;
};

export type guardian = {
  fatherName: string;
  fatherOcuparion: string;
  fatherContactNo: string;
  motherName: string;
  motherOcupation: string;
  motheContactNo: string;
};

export type Student = {
  studentId: string | number;
  name: studentName;
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'B+' | 'A-' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  premanentAddress: string;
  gurdian: guardian;
  profilImage: string;
  isActive: 'active' | 'deActive';
};
