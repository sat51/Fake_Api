import express, { Request, Response } from 'express';
import { UserModel, IUser } from '../models/user_model';

import dotenv from 'dotenv';
import { handleLogin, handleaddUser, handlegetAll } from '../services/user.service';
import { handleSingle } from '../services/product.services';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';



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

const getAll = async(req:Request,res:Response):Promise<void>=>{
    try{
        const response = await handlegetAll();
        res.status(200).json({response});
    }
    catch(err:any){
        res.status(500).json({message:err.message});
    }
    
}

const getSingle = async(req: AuthenticatedRequest,res:Response) => {
    const userId = req.userId;
    // console.log(userId);
   try{
    const response = await handleSingle(userId);
    res.status(200).json({response});
   }
   catch(err:any){
    res.status(500).json({message:err.message});
   }

}

export { createUser, loginUser ,getAll,getSingle};












//get a single user
// router.get('/users/:userId', async (req: Request, res: Response) => {
//     try {
//         // Extract the user ID from the request parameters
//         const userId: string = req.params.userId;

//         // Query the database collection to find the user by ID
//         const user: IUser | null = await UserModel.findById(userId);

//         // Check if the user was found
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Return the user in the response
//         res.json(user);
//     } catch (error:any) {
//         console.error('Error fetching user:', error.message);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


//limit results

// router.get('/limit/:limit', async (req: Request, res: Response) => {
//     try {
//         // Set default limit value (you can change it as needed)
//         const limit: number = parseInt(req.params.limit);
//         // Query limited users from the database collection
//         const users: IUser[] = await UserModel.find().limit(limit);

//         // Return the list of limited users in the response
//         res.json(users);
//     } catch (error:any) {
//         console.error('Error fetching users:', error.message);
//         res.status(500).json({ message: 'Internal server error hhhh' });
//     }
// });


//update user

// router.put('/users/:userId', async (req: Request, res: Response) => {
//     try {
//         const userId: string = req.params.userId;
//         const updateData: Partial<IUser> = req.body;

//         // Update the user in the database collection
//         const updatedUser: IUser | null = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

//         // Check if the user exists and return the updated user
//         if (updatedUser) {
//             res.json(updatedUser);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error:any) {
//         console.error('Error updating user:', error.message);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

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


