import { Studens } from "../types/PersonaTypes";
import studenModel from "../models/Student";
import { generateJwt } from "../helpers/generateJwt";
import { loginPersonal } from "../types/PersonaTypes";

export const getStudenServ = async () => {
  try {
    const studens = await studenModel.find().populate("course calif");
    if (studens.length <= 0) {
      const error = new Error("No hay estudiantes");
      return error;
    }
    return studens;
  } catch (error) {
    console.log(error);
  }
};

export const getStudentByIdServ = async (id: string) => {
  try {
    const studen = searchStudenHelper(id);
    return studen;
  } catch (error) {
    return error;
  }
};

export const postStudenServ = async (studen: Studens) => {
  try {
    const studenExist = await studenModel.findOne({ email: studen.email });

    if (studenExist) {
      const error = new Error("El estudiante ya existe");
      return error;
    }
    const newStuden = new studenModel(studen);
    await newStuden.save();
    return {
      message: "Estudiante creado correctamente",
    };
  } catch (error) {
    throw error;
  }
};

export const updateStudenServ = async (studen: Studens, id: string) => {
  try {
    const upStuden = await searchStudenHelperUpdate(id, studen);
    return upStuden;
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudenServ = async (id: string) => {
  try {
    const studen = await studenModel.findOneAndDelete({ _id: id });
    if (!studen) {
      return {
        message: "El estudiante no existe",
      };
    }
    return {
      message: "Estudiante eliminado correctamente",
    };
  } catch (error) {
    console.log(error);
  }
};

export const loginStudenServ = async (body: loginPersonal) => {
  const { email, password } = body;

  try {
    const user = await studenModel.findOne({ email: email });

    

    if (!user) {
      const error = new Error("Usuario o  contraseña son incorrectos");
      return error;
    }
    console.log("Hola 2");
    if (await user.comparePassword(password)) {
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateJwt(user._id),
      };
    } else {
      const error = new Error("Usuario o  contraseña son incorrectos");

      throw error;
    }
  } catch (error) {
    // console.log("Srv", error);
    return error;
  }
};

const loginHelper = async (id: string) => {
  try {
    const search = await studenModel.findById(id);
    if (!search) return;
    return search;
  } catch (error) {
    const errors = new Error("El estudiante no existe");
    throw errors;
  }
};

//*Helpers
const searchStudenHelper = async (id: string) => {
  try {
    const search = await studenModel.findById(id).populate("course calif");
    if (!search) return;
    return search;
  } catch (error) {
    const errors = new Error("El estudiante no existe");
    throw errors;
  }
};

const searchStudenHelperUpdate = async (id: string, body: any) => {
  try {
    const search = await studenModel.findByIdAndUpdate(id, body, { new: true });
    if (!search) return;
    return search;
  } catch (error) {
    const errors = new Error("El estudiante no existe");
    throw errors;
  }
};
