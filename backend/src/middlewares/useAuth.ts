import {verify} from 'jsonwebtoken'
import {Response, NextFunction} from 'express'
import studentModel from '../models/Student'

const useAuth = async (req: any, res: Response, next: NextFunction) => {
  //TODO: cambiar el any por el tipo de dato que corresponda
  let token:string | undefined ;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = verify(String(token), String(process.env.JWT_SECRET));
      req.user = await studentModel.findById({
        _id: (decoded as any).id,
      }).select("-password, -confirmado, -token -__v -createdAt -updatedAt");
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Tu token no es valido" });
    }
  }
  if (!token) {
    const error = new Error("No token, autorizacion denegada");
    return res.status(401).json({ message: error.message });
  }
  next();
};

export default useAuth;