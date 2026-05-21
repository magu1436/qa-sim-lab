export type LoginApi = {
  student_id: string;
  password: string;
};

export type SignUpApi = {
  student_id: string;
  name: string;
  mail: string;
  password: string;
};

export type UserApi = {
  id: number;
  student_id: string;
  name: string;
  mail: string;
}