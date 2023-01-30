import { Request, Response } from "express";
import {
  getCalifServ,
  postCalifServ,
  getCalifByIdServ,
  deleteCalifServ,
} from "../services/calif.services";

export const getCalifCtrl = async (_req: Request, res: Response) => {
  const response = await getCalifServ();

  res.json(response);
};

export const getCalifByIdCtrl = async (req: Request, res: Response) => {
  try {
    const response = await getCalifByIdServ(req.params.id);

    res.json(response);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const addCalifCtrl = async (req: Request, res: Response) => {
  try {
    const response = await postCalifServ(req.body);
    res.json(response);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export const deleteCalif = async (req: Request, res: Response) => {
  try {
    const response = await deleteCalifServ(req.params.id);
    if(response instanceof Error){
      return res.status(400).json({message: response.message})
    }
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};
