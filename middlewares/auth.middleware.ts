import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();


interface AuthenticatedRequest extends Request {
    userId: string; // Assuming userId is a string
}


const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token not provided" });
        }

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

        // Extract the user ID from the payload
        const { userId } = decodedToken;
        // console.log(userId);

        // Attach the user ID to the request object for further use in subsequent middleware or routes
        (req as  AuthenticatedRequest).userId = userId;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};



    export {auth,AuthenticatedRequest};
    