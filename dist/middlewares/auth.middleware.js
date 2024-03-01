"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth = (req, res, next) => {
    var _a;
    try {
        // Extract the token from the Authorization header
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token not provided" });
        }
        // Verify the token
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Extract the user ID from the payload
        const { userId } = decodedToken;
        // console.log(userId);
        // Attach the user ID to the request object for further use in subsequent middleware or routes
        req.userId = userId;
        // Call the next middleware or route handler
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
exports.auth = auth;
