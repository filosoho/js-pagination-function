import express from "express";
import { paginateHandler } from "../handlers/paginateHandler.js";
import { paginateDocs } from "../functions/paginateDocs.js";

const router = express.Router();

router.post("/", paginateHandler);
router.get("/", (req, res) => res.json(paginateDocs));

export default router;
