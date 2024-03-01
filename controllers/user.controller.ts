import express, { Request, Response } from 'express';
import { UserModel, IUser } from '../models/user_model';

import dotenv from 'dotenv';
import { handleLimitedUser, handleLogin, handleSingleUser, handleUpdateUser, handleaddUser, handledeleteUser, handlegetAll } from '../services/user.service';
import { handleSingle } from '../services/product.services';



dotenv.config();
const router = express.Router();

router.use(express.json());

// Signup route


const createUser = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        // console.log(req);
        const response = await handleaddUser(data);
        res.status(200).json({ response });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const response = await handleLogin(data);
        res.status(200).json({ response });
    }
    catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

const getAllUser = async(req:Request,res:Response):Promise<void>=>{
    try{
        const response = await handlegetAll();
        res.status(200).json({response});
    }
    catch(err:any){
        res.status(500).json({message:err.message});
    }
    
}

const getSingleUser = async(req: Request,res:Response) => {
    const userId  = req.userId;
    // console.log(userId);
   try{
    const response = await handleSingleUser(userId);
    return res.status(200).json({response});
   }
   catch(err:any){
    return res.status(500).json({message:err.message});
   }

}


const getLimitedUser = async(req:Request,res:Response) =>{
     const limit = req.params.limit;
    try{
        const response = await handleLimitedUser(limit);
        return res.status(200).json({response});
    }
    catch(err:any){
        return res.status(500).json({message:err.message});
    }
}

const updateUser = async(req:Request,res:Response) =>{
    const userId = req.userId;
    const data:Partial<IUser> = req.body;
    try{
        const response = await handleUpdateUser(userId,data);
        res.status(200).json({response});
    }catch(err:any){
        res.status(500).json({message:err.message});
    }
}

const deleteUser = async(req:Request,res:Response)=>{
    const userId = req.userId;
    try{
        const response = await handledeleteUser(userId);
        res.status(200).json({response});
    }catch(err:any){
        res.status(500).json({message:err.message});
    }
}


export { createUser, loginUser ,getAllUser,getSingleUser,getLimitedUser,updateUser,deleteUser};


















// router.delete('/users/:userId', async (req: Request, res: Response) => {
//     try {
//         const userId: string = req.params.userId;

//         // Find the user by ID and delete it from the database collection
//         const deletedUser: IUser | null = await UserModel.findByIdAndDelete(userId);

//         // Check if the user exists and return the deleted user
//         if (deletedUser) {
//             res.json({message:"user deleted successfully"});
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error:any) {
//         console.error('Error deleting user:', error.message);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


