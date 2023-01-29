import { Router } from "express";
import { getCourse } from "../controllers/courseCtrl";

const router = Router();

router.route("/").get(getCourse);

export { router };
