import express from 'express';
import  { addProduct,
     getAll, 
     getSingle ,
     getByLimit, 
     getByOrder,
     getallcategories,
      getProductsByCategory, 
      getupdateProducts, 
      deleteProduct} from '../controllers/product.controller'
import {validateCreateProductSchema }  from '../middlewares/joi.middleware';


 
const router = express.Router();
 router.use(express.json());
router.post('/add',validateCreateProductSchema,addProduct)
router.get('/single/:id',getSingle)
router.get('/all',getAll)
router.get('/all/:limit',getByLimit)
router.get('/all/order/:order',getByOrder)
router.get('/category',getallcategories)
router.get('/category/:category',getProductsByCategory)
router.put('/update/:id',getupdateProducts)
router.delete('/delete/:id',deleteProduct)


export default router;