import express from 'express';
import {addCart, addProductToCart, deleteSingleCart, getAllCart, getCartInRange, getSingleCart, sortCarts, updateSingleCart, userCart} from '../controllers/cart.controller';
import { validateCreateCartSchema } from '../middlewares/joi.middleware';
import { auth } from '../middlewares/auth.middleware';

// import { cartMiddleware } from '../middlewares/cart.middleware';

const router = express.Router();
router.use(express.json());

router.post('/add',auth,validateCreateCartSchema,addCart);
router.get('/single/:id',getSingleCart);
router.get('/all',getAllCart);
router.put('/update/:id',updateSingleCart);
router.delete('/delete/:id',deleteSingleCart);
router.get('/usercart',auth,userCart);
router.get('/sort/:order',auth,sortCarts);
router.get('/range',getCartInRange);
router.post('/addproduct',auth,addProductToCart);

export default router;