// import express , {Request , Response, response } from 'express';
// import { IOrder } from '../models/cart.model';
// import {handleaddCart} from '../services/cart.services';
// import {cartMiddleware,AuthenticatedRequest} from '../middlewares/cart.middleware';
// import { UserIdObject } from '../services/cart.services';


// const addCart=(req:AuthenticatedRequest,res:Response)=>{
//     const userid:UserIdObject =  { id: req.userId };
//     const cartData:IOrder = req.body;
//     handleaddCart(cartData,userid)
//     .then((response)=>{
//         res.status(200).json({response});
//     })
//     .catch((error)=>{
//         res.status(500).json({error:error.message});
//     })
// }

// export default addCart;