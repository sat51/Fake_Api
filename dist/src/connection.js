"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB = process.env.MONGODB_URI || " ";
// console.log(MONGODB);
const connectDb = async () => {
    await mongoose_1.default.connect(MONGODB)
        .then(() => {
        console.log('Connected to MongoDB');
    })
        .catch((error) => {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    });
};
exports.default = connectDb;
