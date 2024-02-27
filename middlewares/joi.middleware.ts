import {Request,Response,NextFunction} from 'express';
import productSchema from '../validators/product.validator';

function validateCreateProductSchema(req:Request,res:Response,next:NextFunction){
    const {error} = productSchema.validate(req.body);
    if(error){
        return res.status(400).json({error:error.details[0].message});
    }
    next();
}

export default validateCreateProductSchema;