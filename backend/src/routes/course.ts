import { Router } from "express";
import {
  getCourse,
  addCourseCtrl,
  getCourseByIdCtrl,
  updateCourseCtrl,
  deleteCourseCtrl,
} from "../controllers/courseCtrl";

const router = Router();

router.route("/").get(getCourse).post(addCourseCtrl);
router
  .route("/:id")
  .get(getCourseByIdCtrl)
  .put(updateCourseCtrl)
  .delete(deleteCourseCtrl);
  
export { router };
