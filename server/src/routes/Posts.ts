import express from "express";
import * as PostsController from "../controllers/Posts";

const router = express.Router();

router.post("/create", PostsController.create);
router.get("/myposts", PostsController.getMyPosts);
router.get("/allposts", PostsController.getAllPosts);

export default router;