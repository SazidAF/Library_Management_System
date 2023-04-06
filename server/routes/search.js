import express from "express";
const router = express.Router();
import { filter } from "../controllers/searchController.js";

router.get('/', filter);
export default router;