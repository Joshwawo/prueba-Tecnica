import califModel from "../models/Calif";

export const getCalifServ = async () => {
  try {
    const calif = await califModel.find().populate("studen course")
    if (calif.length <= 0) {
      const error = new Error("No hay calificaciones");
      return error;
    }

    return calif;
  } catch (error) {
    console.log(error);
  }
};

export const getCalifByIdServ = async (id: string) => {
  try {
    const calif = await searchCalifHelper(id);
    return calif;
  } catch (error) {
    console.log(error);
  }
};

export const postCalifServ = async (calif: any) => {
  //Todo: cambiar el tipo de la calificacion
  try {
    const newCalif = new califModel(calif);

    const califSaved = await newCalif.save();

    return califSaved;
  } catch (error) {
    throw new Error("Solo numeros en la calificacion");
  }
};

export const updateCalif = async (califact:any, id:string) => {
  
  try {

    const calif = await searchCalifHelperUpdate(id, califact)

    return calif

    
  } catch (error) {
    console.log(error)
    throw error
  }

}


export const deleteCalifServ = async (id: string) => {
  try {
    const calif = await califModel.findOneAndDelete({ _id: id });
    if (!calif) {
      const error = new Error("No existe la calificacion");
      return error;
    }
    return calif;
  } catch (error) {
    console.log(error);
  }
};

//*Helpers
const searchCalifHelper = async (id: string) => {
  try {
    const search = await califModel.findById(id);

    if (!search) throw Error;

    return search;
  } catch (error) {
    const errors = new Error("El curso no existe");
    throw errors;
  }
};

const searchCalifHelperUpdate = async (id: string, body: any) => {
  try {
    const search = await califModel.findByIdAndUpdate(id, body, { new: true });
    if (!search) return;
    return search;
  } catch (error) {
    const errors = new Error("El estudiante no existe");
    throw errors;
  }
};


