import { IOrder, OrderModel } from "../models/cart.model";
import express,{Request,Response} from 'express';
import { handleAllCart, handleCartInRange, handleDeleteSingleCart, handleSingleCart, handleSortCarts, handleUserCart, handleaddCart, handleupdateSingleCart } from "../services/cart.services";
import { handleSingle } from "../services/product.services";


const addCart= async(req:Request,res:Response) =>{
    const userId = req.userId;
    const data = req.body;
    try{
        const response = await handleaddCart(data,userId);
        res.status(200).json({response});
    }catch(err:any){
        res.status(500).json({message:err.message});
    }
}

const getSingleCart = async(req:Request,res:Response) =>{
    const cartId = req.params.id;
    try{
        const response = await handleSingleCart(cartId);
        res.status(200).json({response});
    }catch(err:any){
        res.status(500).json({message:err.message});
    }
}

const getAllCart = async(req:Request,res:Response) =>{
    try{
        const response = await handleAllCart();
        res.status(200).json({response});
    }catch(err:any){
        res.status(500).json({message:err.message});
    }
}

const updateSingleCart = async(req:Request,res:Response) =>{
    const cartId = req.params.id;
    const cartData:Partial<IOrder> = req.body;
    try{
        const response = await handleupdateSingleCart(cartId,cartData);
        res.status(200).json({response});
    }catch(err:any){
        res.status(500).json({message:err.message});
    }
}

const deleteSingleCart = async(req:Request,res:Response) =>{
    const cartId = req.params.id;
    try{
        const response = await handleDeleteSingleCart(cartId);
        res.status(200).json({response});
    }catch(err:any){
        res.status(500).json({message:err.message});
    }
}

const userCart = async(req:Request,res:Response) =>{
    const userId = req.userId;
    try{
        const result = await handleUserCart(userId);
        res.status(200).json({result});
    }catch(err:any){
        res.status(500).json({message:err.message});
    }
}

const sortCarts = async(req:Request,res:Response) =>{
    const order:string = req.params.order;
    try{
        const result = await handleSortCarts(order);
        res.status(200).json({result});
    }catch(err:any){
        res.status(500).json({message:err.message});
    }
}

const getCartInRange = async(req:Request,res:Response) =>{
    const { startDateparam, endDateparam } = req.query;

    console.log(startDateparam);
    console.log(endDateparam);
    try{
        const result = await handleCartInRange(startDateparam,endDateparam);
        res.status(200).json({result});
    }catch(err:any){
        res.status(500).json({err});
    }
}



export {addCart,getSingleCart,getAllCart,updateSingleCart,deleteSingleCart,userCart,sortCarts,getCartInRange};