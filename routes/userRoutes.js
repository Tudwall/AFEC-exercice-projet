import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();
const userController = new UserController();

router.post("/", (req, res) => userController.createUser(req, res));

export default router;
