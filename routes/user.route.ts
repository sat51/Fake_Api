import express from 'express';
import {createUser, deleteUser, getAllUser, getLimitedUser, getSingleUser, loginUser, updateUser} from '../controllers/user.controller';
import { validateCreateUserSchema } from '../middlewares/joi.middleware';
import {auth} from '../middlewares/auth.middleware';
const router = express.Router();


router.use(express.json());
router.post('/signup',validateCreateUserSchema,createUser);
router.post('/login',loginUser);
router.get('/all',auth,getAllUser);
router.get('/single',auth,getSingleUser);
router.get('/limit/:limit',getLimitedUser);
router.put('/update',auth,updateUser);
router.delete('/delete',deleteUser);
export default router;