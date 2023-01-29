import { Request, Response } from "express";
import { getTeacherServ, postTeacherServ,getTeacherByIdServ, updateTeacherServ,deleteTeacherServ } from "../services/teacher.service";

export const getTeacherCtrl = async (_req: Request, res: Response) => {
  try {
    const response = await getTeacherServ();
    if (response instanceof Error) {
      return res.status(400).json({ message: response.message });
    }
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getTeacherByIdCtrl = async (req: Request, res: Response) => {
  try {
    const response = await getTeacherByIdServ(req.params.id)
    res.json(response)
  } catch (error:any) {
    return res.status(400).json({message: error.message})
  }
};

export const addTeacherCtrl = async (req: Request, res: Response) => {
  try {
    const response = await postTeacherServ(req.body);
    if(response instanceof Error){
      return res.status(400).json({message: response.message})
    }
    res.json(response);
  } catch (error:any) {
    return res.status(400).json({message: error.message})
  }
};

export const updateTeacherCtrl = async (req: Request, res: Response) => {
  try {
    const response = await updateTeacherServ(req.body, req.params.id)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
};

export const deleteTeacherCtrl = async (req: Request, res: Response) => {
  try {
    const response = await deleteTeacherServ(req.params.id)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
};