export interface Studens {
  name: string;
  lastName: string;
  sex: string;
  dateBirth?: Date;
  userName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  course: string[];
  calif: string | number [];
  comparePassword(password: string): Promise<boolean>;
}

export interface Teacher {
  name: string;
  lastName: string;
  sex: string;
  dateBirth?: Date;
  userName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  comparePassword(password: string): Promise<boolean>;
}
export interface loginPersonal {
  password: string;
  email: string;
}

export interface Course {
  name: string;
  duration: string;
  description: string;
}

export interface calif {
  califPractice: number;
  califPartial: number;
  califGrading: number;
  finalAverage: number;
  course: object | string,
  calif: string | number []
  studen: string | object
}
