import express from "express";
import * as UsersController from "../controllers/Users";

const router = express.Router();


router.get("/", UsersController.getAuthenticatedUser);
router.post("/register", UsersController.register);
router.get("/findbyid/:id", UsersController.findById);

router.post("/login", UsersController.login);
router.post("/logout", UsersController.logout);


export default router;