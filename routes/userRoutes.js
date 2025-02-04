import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();
const userController = new UserController();

router.get("/", (req, res) => userController.getUsers(req, res));

router.get("/:id", (req, res) => userController.getUsersById(req, res));

router.post("/", (req, res) => userController.createUser(req, res));

router.delete("/:id", (req, res) => userController.deleteUser(req, res));

router.put("/:id", (req, res) => userController.updateUser(req, res));

export default router;
