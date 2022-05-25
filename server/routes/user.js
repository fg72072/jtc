import express from "express";
import { getusers , createuser ,updateuser ,deleteuser } from "../controllers/users.js";

const router = express.Router()

router.get('/', getusers )
router.post('/', createuser)
router.patch('/:id',updateuser)
router.delete('/:id',deleteuser)

export default router;