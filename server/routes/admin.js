import express from "express";
import { getMonths , createMonth ,deleteMonth } from "../controllers/admin.js";

const router = express.Router()

router.get('/', getMonths )
router.post('/', createMonth)
router.delete('/:id',deleteMonth)

export default router;