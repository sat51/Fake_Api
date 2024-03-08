"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handledeleteUser = exports.handleUpdateUser = exports.handleLimitedUser = exports.handleSingleUser = exports.handlegetAll = exports.handleLogin = exports.handleaddUser = void 0;
const user_model_1 = require("../models/user_model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleaddUser = async (data) => {
    const { email, username, password } = data;
    //console.log(email);
    try {
        // Check if user with the email or username already exists
        const existingUser = await user_model_1.UserModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return "user already exists";
        }
        // Hash the password
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(data.password, salt);
        // Create a new user
        data.password = hashedPassword;
        const newUser = new user_model_1.UserModel(data);
        await newUser.save();
        // Create and sign a JWT token
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, process.env.JWT_SECRET);
        return token;
    }
    catch (error) {
        throw error;
    }
};
exports.handleaddUser = handleaddUser;
const handleLogin = async (data) => {
    const { email, password } = data;
    try {
        // Replace this with your actual logic to fetch user data from the database
        const user = await user_model_1.UserModel.findOne({ email });
        // Check if user exists and if password is correct
        if (!user || !bcrypt_1.default.compareSync(password, user.password)) {
            return "Invalid email or password";
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET);
        return token;
    }
    catch (error) {
        console.error('Login error:', error.message);
        throw error;
    }
};
exports.handleLogin = handleLogin;
const handlegetAll = async () => {
    try {
        const result = await user_model_1.UserModel.find();
        return result;
    }
    catch (err) {
        throw err;
    }
};
exports.handlegetAll = handlegetAll;
const handleSingleUser = async (id) => {
    try {
        const result = await user_model_1.UserModel.findById(id);
        // console.log(result);
        return result;
        //return result;
    }
    catch (err) {
        throw err;
    }
};
exports.handleSingleUser = handleSingleUser;
const handleLimitedUser = async (data_limit) => {
    try {
        const limited = parseInt(data_limit, 10);
        const result = await user_model_1.UserModel.find().limit(limited);
        return result;
    }
    catch (err) {
        throw err;
    }
};
exports.handleLimitedUser = handleLimitedUser;
const handleUpdateUser = async (userid, data) => {
    try {
        const result = await user_model_1.UserModel.findByIdAndUpdate(userid, data, { new: true });
        return result;
    }
    catch (err) {
        throw err;
    }
};
exports.handleUpdateUser = handleUpdateUser;
const handledeleteUser = async (userid) => {
    try {
        const result = await user_model_1.UserModel.findByIdAndDelete(userid);
        return "user deleted ";
    }
    catch (err) {
        throw err;
    }
};
exports.handledeleteUser = handledeleteUser;
