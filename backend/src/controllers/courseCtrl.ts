import { Request, Response } from "express";
import { getCourseServ } from "../services/course.service";

export const getCourse = async (_req: Request, res: Response) => {
  try {
    const response = await getCourseServ();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
