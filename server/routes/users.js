import express from "express";
const router = express.Router();
import { getOneUser, createUser, updateUser, deleteUser} from "../controllers/userController.js";

router.get('/:id', getOneUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;