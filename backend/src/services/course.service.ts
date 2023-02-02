import courseModel from "../models/Course";
import { Course } from "../types/PersonaTypes";

export const getCourseServ = async () => {
  try {
    const courses = await courseModel.find();

    if (courses.length <= 0) {
      const error = new Error("No hay cursos");
      return error;
    }

    return courses;
  } catch (error) {
    console.log(error);
  }
};

export const getCourseByIdServ = async (id: string) => {
  try {
    const course = await searchCourseHelper(id);

    return course;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postCourseServ = async (course: Course) => {
  try {
    const courseExist = await courseModel.findOne({ name: course.name });

    if (courseExist) {
      const error = new Error("El curso ya exsite");
      return error;
    }

    const newCourse = new courseModel(course);

    const newCourseSaved = await newCourse.save();

    return newCourseSaved;
  } catch (error) {
    throw error;
  }
};

export const updateCourseServ = async (courses: Course, id: string) => {
  try {
    const course = await searchCourseHelperUpdate(id, courses);

    return course;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCourseServ = async (id: string) => {
  try {
    const course = await courseModel.findOneAndDelete({ _id: id });
    if (!course) {
      const error = new Error("El curso no existe");
      return error;
    }
    // console.log(course);
    return {
      message: "Courso eliminado correctamente",
    };
  } catch (error) {
    console.log(error);
    throw new Error("El curso no existe");
  }
};

//*Helpers
const searchCourseHelper = async (id: string) => {
  try {
    const search = await courseModel.findById(id);

    if (!search) throw Error;

    return search;
  } catch (error) {
    const errors = new Error("El curso no existe");
    throw errors;
  }
};

const searchCourseHelperUpdate = async (id: string, body: Course) => {
  try {
    const search = await courseModel.findByIdAndUpdate(id, body, { new: true });
    if (!search) return;
    return search;
  } catch (error) {
    const errors = new Error("El curso no existe");
    throw errors;
  }
};
