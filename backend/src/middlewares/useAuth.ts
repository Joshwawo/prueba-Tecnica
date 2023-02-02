import {verify} from 'jsonwebtoken'
import {Response, NextFunction} from 'express'
import studentModel from '../models/Student'
import teacherModel from '../models/Teacher'

const useAuth = async (req: any, res: Response, next: NextFunction) => {
  let token:string | undefined ;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = verify(String(token), String(process.env.JWT_SECRET));
      const student = await studentModel.findById({
        _id: (decoded as any).id,
      }).select("-password, -confirmado, -token -__v -createdAt -updatedAt");

      const teacher = await teacherModel.findById({
        _id: (decoded as any).id,
      }).select("-password, -confirmado, -token -__v -createdAt -updatedAt");

      if (student || teacher) {
        req.user = student || teacher;
        return next();
      }
    } catch (error) {
      return res.status(401).json({ message: "Tu token no es valido" });
    }
  }
  if (!token) {
    const error = new Error("No token, autorización denegada");
    return res.status(401).json({ message: error.message });
  }
  next();
};

export default useAuth;
