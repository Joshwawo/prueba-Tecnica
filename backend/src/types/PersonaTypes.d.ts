export interface Users {
  name: string;
  lastName: string;
  sex: string;
  dateBirth?: Date;
  userName: string;
  email: string;
  password: string;
  isAdmin:boolean
  comparePassword(password: string): Promise<boolean>;
}

export interface loginPersonal {
  password: string;
  email: string;
}
