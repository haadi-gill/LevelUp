import express from "express";
import * as PostsController from "../controllers/Posts";

const router = express.Router();

router.post("/new", PostsController.register);

export default router;