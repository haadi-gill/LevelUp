import express from "express";
import * as UsersController from "../controllers/Users";

const router = express.Router();

router.post("/register", UsersController.register);

export default router;