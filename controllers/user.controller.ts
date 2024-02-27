import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import  {UserModel,IUser}  from '../models/user_model';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();
const router = express.Router();

router.use(express.json());

// Signup route
router.post('/signup', async (req: Request, res: Response) => {
    const { email, username, password } = req.body;
    try {
        // Check if user with the email or username already exists
        const existingUser: IUser | null = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new UserModel({
            email,
            username,
            password: hashedPassword, // Store the hashed password
            name: req.body.name, // Assuming 'name' is included in the request body
            address: req.body.address, // Assuming 'address' is included in the request body
            phone: req.body.phone // Assuming 'phone' is included in the request body
        });
        await newUser.save();

        // Create and sign a JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!);

        res.status(201).json({ token });
    } catch (error:any) {
        console.error('Signup error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Login route
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        // Replace this with your actual logic to fetch user data from the database
        const user = await UserModel.findOne({ email });

        // Check if user exists and if password is correct
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);

        // Return token to the client
        res.json({ token });
    } catch (error:any) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});





// Route to get all users
router.get('/users', async (req: Request, res: Response) => {
    try {
        // Query all users from the database collection
       // const sortBy: string = req.query.sortBy || '_id';
        const users: IUser[] = await UserModel.find().sort(`_id`);

        // Return the list of users in the response
        res.json(users);
    } catch (error:any) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});



//get a single user
router.get('/users/:userId', async (req: Request, res: Response) => {
    try {
        // Extract the user ID from the request parameters
        const userId: string = req.params.userId;

        // Query the database collection to find the user by ID
        const user: IUser | null = await UserModel.findById(userId);

        // Check if the user was found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user in the response
        res.json(user);
    } catch (error:any) {
        console.error('Error fetching user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//limit results

router.get('/limit/:limit', async (req: Request, res: Response) => {
    try {
        // Set default limit value (you can change it as needed)
        const limit: number = parseInt(req.params.limit);
        // Query limited users from the database collection
        const users: IUser[] = await UserModel.find().limit(limit);

        // Return the list of limited users in the response
        res.json(users);
    } catch (error:any) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ message: 'Internal server error hhhh' });
    }
});


//update user

router.put('/users/:userId', async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.userId;
        const updateData: Partial<IUser> = req.body;

        // Update the user in the database collection
        const updatedUser: IUser | null = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

        // Check if the user exists and return the updated user
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error:any) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/users/:userId', async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.userId;

        // Find the user by ID and delete it from the database collection
        const deletedUser: IUser | null = await UserModel.findByIdAndDelete(userId);

        // Check if the user exists and return the deleted user
        if (deletedUser) {
            res.json({message:"user deleted successfully"});
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error:any) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
