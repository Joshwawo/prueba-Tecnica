import { Studens } from "../types/PersonaTypes";
import studenModel from "../models/Student";
import teacherModel from "../models/Teacher";
import courseModel from "../models/Course";

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
      const error = new Error("Ya existe un estudiante con ese correo");
      return error;
    }
    const newStuden = new studenModel(studen);
    const studentSaved = await newStuden.save();
    return studentSaved;
  } catch (error) {
    throw error;
  }
};

export const updateStudenServ = async (studen: Studens, id: string) => {
  try {
    const studenToUpdate = await studenModel.findById(id);
    if (String(studenToUpdate?.email) !== String(studen.email)) {
      const studenExsit = await studenModel.findOne({ email: studen.email });
      if (studenExsit) {
        const error = new Error("Este correo ya existe en otro estudiante");
        return error;
      }
    }
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

export const addCourseStudenServ = async (studenId: string, body: any) => {
  try {
    const studenExist = await studenModel.findOne({ _id: studenId });
    if (!studenExist) {
      const error = new Error("El alumno no existe");
      return error;
    }

    const courseExist = await courseModel.findOne({ _id: body.course });
    if (!courseExist) {
      const error = new Error("El curso no existe");
      return error;
    }

    const studenAlReadyAddCourse = await studenModel.findOne({
      _id: studenId,
      course: body.course,
    });

    if (studenAlReadyAddCourse) {
      const error = new Error("El alumno ya esta inscrito en este curso");
      return error;
    }

    const studenAddCourse = await studenModel.findOneAndUpdate(
      { _id: studenId },
      { $push: { course: body.course } },
      { new: true }
    );

    return studenAddCourse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const loginStudenServ = async (body: loginPersonal) => {
  const { email, password } = body;

  try {
    const user = await findUserHelper(email);

    if (!user) {
      const error = new Error("Usuario o  contraseña son incorrectos");
      return error;
    }
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
    console.log("Catch error:");
    return error;
  }
};

//*Helpers
//Este se utiliza para buscar un estudiante o maestro y devolverlo
const findUserHelper = async (email: string) => {
  const student = await studenModel.findOne({ email });
  if (student) {
    return student;
  }

  const teacher = await teacherModel.findOne({ email });
  if (teacher) {
    return teacher;
  }

  return null;
};

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
