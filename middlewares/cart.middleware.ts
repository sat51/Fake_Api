// import {Request,Response,NextFunction} from 'express';
// import jwt from 'jsonwebtoken';

// interface AuthenticatedRequest extends Request {
//     userId?: {
//         id: string;
//     }; // Define the userId property as an object with id and role properties
// }


// const cartMiddleware = (req:AuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//         let token = req.headers.authorization;
//         if (token) {
//             token = token.split(" ")[1];
//             let decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as { userId: { id: string} };

//             console.log(decodedToken)
//             if (!decodedToken.userId) {
//                 return res.json({ status: 401, msg: "No user ID found in token", data: "" });
//             }
//             req.userId = decodedToken.userId; // Pass userid to the request object
//             next();
//         } else {
//             return res.json({ status: 401, msg: "Unauthorized user", data: "" });
//         }
//     } catch (error: any) {
//         return res.json({ status: 500, msg: error.message, data: "" });
//     }
// };


// export {
//     cartMiddleware,
//     AuthenticatedRequest
// };
