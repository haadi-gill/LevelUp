import express from "express";
import * as PostsController from "../controllers/Posts";

const router = express.Router();

router.post("/create", PostsController.create);
router.get("/myposts", PostsController.getMyPosts);
router.post("/update/title", PostsController.updateTitle);
router.post("/update/caption", PostsController.updateCaption);

export default router;