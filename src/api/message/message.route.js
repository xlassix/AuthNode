import { Router } from "express";
import controllers from "./message.controller";

const router = Router();
router
  .route("/:address")
  .get(controllers.createOne)
  .post(controllers.createOne);

export const messageRouter = router;
