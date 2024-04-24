import express from "express";
import * as PostsController from "../controllers/Posts";

const router = express.Router();

router.post("/create", PostsController.create);
router.get("/myposts", PostsController.getMyPosts);
router.get("/allposts", PostsController.getAllPosts);
router.post("/update/title", PostsController.updateTitle);
router.post("/update/caption", PostsController.updateCaption);
router.post("/update/complete", PostsController.updateCompletion);
router.post("/update/likes", PostsController.updateLiked);

export default router;