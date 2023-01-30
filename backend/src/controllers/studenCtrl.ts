import { Request, Response } from "express";
import {
  postStudenServ,
  getStudenServ,
  getStudentByIdServ,
  updateStudenServ,
  deleteStudenServ,
  loginStudenServ,
} from "../services/studen.services";
import {RequestToken} from '../types/PersonaTypes'

export const getStundenCtrl = async (_req: Request, res: Response) => {
  const response = await getStudenServ();
  if (response instanceof Error) {
    return res.status(400).json({ message: response.message });
  }
  res.json(response);
};

export const getStudenByIdCtrl = async (req: Request, res: Response) => {
  try {
    const response = await getStudentByIdServ(req.params.id);
    if (response instanceof Error) {
      return res.status(400).json({ message: response.message });
    }
    res.json(response);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const addStudenCtrl = async (req: Request, res: Response) => {
  try {
    const response = await postStudenServ(req.body);
    if (response instanceof Error) {
      return res.json({ message: response.message });
    }
    res.json(response);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateStudenCtrl = async (req: Request, res: Response) => {
  const response = await updateStudenServ(req.body, String(req.params.id));
  res.json(response);
};

export const deleteStudenCtrl = async (req: Request, res: Response) => {
  const response = await deleteStudenServ(req.params.id)
  res.json(response);
};

export const loginPersonalCtrl = async (req: Request, res: Response) => {
  try {
    const response = await loginStudenServ(req.body)
    if (response instanceof Error) {
      return res.status(403).json({message: response.message})
    }
    res.json(response)
  } catch (error:any) {
    console.log(error)
    return res.status(403).json({message: error.message})
  }

};


export const perfilCtrl = async (req: RequestToken, res: Response) => {
  try {
    if(!req.user) {
      return res.status(403).json({message: 'No tienes permisos'})
    }
    res.json(req.user)
    
  } catch (error) {
    console.log(error)
  }
};
