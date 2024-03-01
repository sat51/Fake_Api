import express from 'express';
import {createUser, getAll, loginUser} from '../controllers/user.controller';
import { validateCreateUserSchema } from '../middlewares/joi.middleware';
import {auth} from '../middlewares/auth.middleware';
import { getSingle } from '../controllers/product.controller';
const router = express.Router();

router.use(express.json());
router.post('/signup',validateCreateUserSchema,createUser);
router.post('/login',loginUser);
router.get('/all',auth,getAll);
router.get('/single',auth,getSingle)
export default router;