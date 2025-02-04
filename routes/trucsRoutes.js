import express from "express";
import TrucsControllers from "../controllers/trucsController.js";

const router = express.Router();
const trucsController = new TrucsControllers();

router.put("/trucs/:id", (req, res) => trucsController.updateTrucs(req, res));
export default router;
