import { Router } from "express";
import {
  getAllUserData,
  getOneUserData,
  updateUser,
} from "../controllers/users.controller.js";

const userRouter = Router();

userRouter.get("/", getAllUserData);
userRouter.get("/:user_id", getOneUserData);
userRouter.put("/:user_id", updateUser);

export default userRouter;
