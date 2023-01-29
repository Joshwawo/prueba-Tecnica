import TeacherModel from "../models/Teacher";

export const getTeacherServ = async () => {
  try {
    const teacher = await TeacherModel.find();
    if (teacher.length <= 0) {
      const error = new Error("No hay maestros");
      return error;
    }
    return teacher;
  } catch (error) {
    return error;
  }
};

export const getTeacherByIdServ =async (id:string) => {
  try {

    const teacher = await searchTeacherHelper(id)
    return teacher
    
  } catch (error) {
    throw error
  }
}

interface TeacherTypes {
  name: string;
  lastName: string;
  sex: string;
  userName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
export const postTeacherServ = async (body: TeacherTypes) => {
  try {
    const teacherExist = await TeacherModel.findOne({
      $or: [{ email: body.email }, { userName: body.userName }],
    });

    if (teacherExist) {
      const error = new Error("El maestro ya existe");
      return error;
    }
    const teacher = new TeacherModel(body);
    await teacher.save();

    return {
      message: "Maestro creado correctamente",
    };
  } catch (errors) {
    console.log(errors)
    const error = new Error("El maestro ya existe");
    throw error;
  }
};

export const updateTeacherServ = async (body:TeacherTypes, id:string) => {
  try {
    const teacher = await searchTeacherHelperUpdate(id, body)
    return teacher
    
  } catch (error) {
    console.log(error)
  }
}

export const deleteTeacherServ = async (id:string) => {
  try {

    const teacher = await TeacherModel.findOneAndDelete({_id: id})

    if(!teacher){
      return{
        message: "El maestro no existe"
      }
    }
    return{
      message: "Maestro eliminado correctamente"
    }
    
  } catch (error) {
    console.log(error)
  }
  
}


const searchTeacherHelper = async (id: string) => {
  try {

    const search = await TeacherModel.findById(id);
    if (!search) return;
    return search;
  } catch (error) {
    const errors = new Error("El maestro no existe");
    throw errors;
  }
};

const searchTeacherHelperUpdate = async (id: string, body: any) => {
  try {
    const search = await TeacherModel.findByIdAndUpdate(id, body, { new: true });
    if (!search) return;
    return search;
  } catch (error) {
    const errors = new Error("El estudiante no existe");
    throw errors;
  }
}

