import {Request,Response,NextFunction} from 'express';
import  {productSchema,UserSchemaJoi} from '../validators/product.validator';

function validateCreateProductSchema(req:Request,res:Response,next:NextFunction){
    const {error} = productSchema.validate(req.body);
    if(error){
        return res.status(400).json({error:error.details[0].message});
    }
    next();
}
function validateCreateUserSchema(req:Request,res:Response,next:NextFunction){
    const {error} = UserSchemaJoi.validate(req.body);
    // console.log(`--------->`,req)
    if(error){
        return res.status(400).json({error:error.details[0].message});
    }
    next();
}

// function validateCreateCartSchema(req:Request,res:Response,next:NextFunction){
//     const {error} = OrderSchema.validate(req.body);
//     if(error){
//         return res.status(400).json({error:error.details[0].message});
//     }
//     next();
// }
export { validateCreateProductSchema,
    validateCreateUserSchema} ;