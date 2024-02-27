import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

    const auth = (req:Request, res:Response, next:NextFunction) => {
        //console.log(`HTTP method : ${req.method}, URL : ${req.url}`);
        try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token,process.env.JWT_SECRET!);
            next();
        } else { 
            return res.json({ status: 401, msg: "unauthorize user", data: "" });
        }
        
        } catch (error:any) {
        return res.json({ status: 500, msg: error.message, data: "" });
        }
    };


    export default auth;
    