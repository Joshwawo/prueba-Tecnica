import { Request, Response } from "express";
import {
  getCourseServ,
  postCourseServ,
  getCourseByIdServ,
  updateCourseServ,
  deleteCourseServ,
} from "../services/course.service";

export const getCourse = async (_req: Request, res: Response) => {
  try {
    const response = await getCourseServ();
    if (response instanceof Error) {
      return res.status(400).json({ message: response.message });
    }
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getCourseByIdCtrl = async (req: Request, res: Response) => {
  try {
    const response = await getCourseByIdServ(req.params.id);

    if(response instanceof Error){
      return res.status(400).json({message: response.message})
    }

    res.json(response);
  } catch (error: any) {
    // console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const addCourseCtrl = async (req: Request, res: Response) => {
  try {
    const response = await postCourseServ(req.body);
    if (response instanceof Error) {
      return res.status(400).json({ message: response.message });
    }
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const updateCourseCtrl = async (req: Request, res: Response) => {
  try {
    const response = await updateCourseServ(req.body, req.params.id);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCourseCtrl = async (req: Request, res: Response) => {
  try {
    const response = await deleteCourseServ(req.params.id);
    if (response instanceof Error) {
      return res.status(400).json({ message: response.message });
    }
    return res.json(response);
  } catch (error:any) {
    console.log(error);
    return res.status(400).json({message: error.message})
  }
};
