export interface StudentPerfil {
  _id:       string;
  name:      string;
  password:  string;
  lastName:  string;
  sex:       string;
  dateBirth: string;
  email:     string;
  userName:  string;
  isAdmin:   boolean;
  course:    Course[] 
  calif:     Calif[] 
  createdAt: string;
  updatedAt: string;
  __v:       number 


}


// Generated by https://quicktype.io

export interface StudenPerfilNew {
  _id:       string;
  name:      string;
  password:  string;
  lastName:  string;
  sex:       string;
  dateBirth: string;
  email:     string;
  userName:  string;
  isAdmin:   boolean;
  course:    Course[];
  calif:     Calif[];
  createdAt: string;
  updatedAt: string;
  __v:       number;
}

export interface Calif {
  _id:           string;
  califPractice: number;
  califPartial:  number;
  califGrading:  number;
  finalAverage:  number;
  studen:        string;
  course:        string;
  createdAt:     string;
  updatedAt:     string;
  __v:           number;
}

export interface Course {
  _id:         string;
  name:        string;
  description: string;
  duration:    string;
  createdAt:   string;
  updatedAt:   string;
  __v:         number;
}





export interface AllStudents {
  _id:       string;
  name:      string;
  password:  string;
  lastName:  string;
  sex:       Sex | string;
  dateBirth: string;
  email:     string;
  userName:  string;
  isAdmin:   boolean;
  course:    any[];
  calif:     any[];
  createdAt: string;
  updatedAt: string;
  __v:       number;
}

export enum Sex {
  Femenino = "femenino",
  Masculino = "masculino",
}
