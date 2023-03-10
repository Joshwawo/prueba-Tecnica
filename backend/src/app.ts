import express, { Application, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { router } from "./routes";
import { dbConnect } from "./config/mongo";

const app: Application = express();
const PORT:number = Number(process.env.PORT) || 3001;


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
dbConnect();
app.use(router);

app.get("*", (_: Request, res: Response) => {
  res.json({ message: "No existe esta ruta", statusCode: 400 });
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
