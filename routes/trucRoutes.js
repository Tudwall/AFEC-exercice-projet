import express from "express";
import TrucController from "../controllers/trucController.js";

const router = express.Router();
const trucController = new TrucController();

router.delete("/:id", (req, res) => trucController.deleteTruc(req, res));

export default router;
