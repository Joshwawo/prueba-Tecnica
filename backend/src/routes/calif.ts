import { Router } from "express";
import { getCalifCtrl,addCalifCtrl,getCalifByIdCtrl,deleteCalif } from "../controllers/califCtrl";

const router = Router();

router.route("/").get(getCalifCtrl).post(addCalifCtrl)
router.route("/:id").get(getCalifByIdCtrl).delete(deleteCalif)


export{
  router
}
