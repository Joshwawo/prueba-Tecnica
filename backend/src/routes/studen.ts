import { Router } from "express";
import useAuth from "../middlewares/useAuth";
import {
  getStundenCtrl,
  addStudenCtrl,
  getStudenByIdCtrl,
  updateStudenCtrl,
  deleteStudenCtrl,
  loginPersonalCtrl,
} from "../controllers/studenCtrl";

const router = Router();

router.route("/").get(useAuth, getStundenCtrl).post(addStudenCtrl);
router.post("/login", loginPersonalCtrl);
router
  .route("/:id")
  .get(useAuth, getStudenByIdCtrl)
  .put(useAuth, updateStudenCtrl)
  .delete(useAuth, deleteStudenCtrl)

export { router };
