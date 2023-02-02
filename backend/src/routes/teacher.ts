import { Router } from "express";
import {
  getTeacherCtrl,
  addTeacherCtrl,
  getTeacherByIdCtrl,
  updateTeacherCtrl,
  deleteTeacherCtrl,
} from "../controllers/teacherCtrl";
import useAuth from '../middlewares/useAuth'

const router = Router();

router.route("/").get(useAuth,getTeacherCtrl).post(addTeacherCtrl);
router
  .route("/:id")
  .get(useAuth,getTeacherByIdCtrl)
  .put(useAuth,updateTeacherCtrl)
  .delete(useAuth,deleteTeacherCtrl);

export { router };
