import jwt from "jsonwebtoken";

export const generateJwt = (id: object) => {
  return jwt.sign({ id }, String(process.env.JWT_SECRET), { expiresIn: "30d" });
};
