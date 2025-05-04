export interface AdminUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    phone: string;
  };
  export interface TeacherProps {
    _id: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phone: string;
    subjectAssigned: SubjectProps;
  };
  export interface SubjectProps {
    _id: string;
    title: string;
    description: string;
    code: string;
    createdAt: string;
    updatedAt: string;
    createdBy: AdminUser;
    teacher?: TeacherProps;
  }