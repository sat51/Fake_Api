"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getLimitedUser = exports.getSingleUser = exports.getAllUser = exports.loginUser = exports.createUser = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_service_1 = require("../services/user.service");
dotenv_1.default.config();
const router = express_1.default.Router();
router.use(express_1.default.json());
// Signup route
const createUser = async (req, res) => {
    try {
        const data = req.body;
        // console.log(req);
        const response = await (0, user_service_1.handleaddUser)(data);
        res.status(200).json({ response });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.createUser = createUser;
const loginUser = async (req, res) => {
    try {
        const data = req.body;
        const response = await (0, user_service_1.handleLogin)(data);
        res.status(200).json({ response });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.loginUser = loginUser;
const getAllUser = async (req, res) => {
    try {
        const response = await (0, user_service_1.handlegetAll)();
        res.status(200).json({ response });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getAllUser = getAllUser;
const getSingleUser = async (req, res) => {
    const userId = req.userId;
    // console.log(userId);
    try {
        const response = await (0, user_service_1.handleSingleUser)(userId);
        return res.status(200).json({ response });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.getSingleUser = getSingleUser;
const getLimitedUser = async (req, res) => {
    const limit = req.params.limit;
    try {
        const response = await (0, user_service_1.handleLimitedUser)(limit);
        return res.status(200).json({ response });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.getLimitedUser = getLimitedUser;
const updateUser = async (req, res) => {
    const userId = req.userId;
    const data = req.body;
    try {
        const response = await (0, user_service_1.handleUpdateUser)(userId, data);
        res.status(200).json({ response });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const userId = req.userId;
    try {
        const response = await (0, user_service_1.handledeleteUser)(userId);
        res.status(200).json({ response });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.deleteUser = deleteUser;
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
