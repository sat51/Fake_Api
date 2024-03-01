"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define sub-schema for name
const NameSchema = new mongoose_1.Schema({
    firstname: String,
    lastname: String
});
// Define sub-schema for address
const AddressSchema = new mongoose_1.Schema({
    city: String,
    street: String,
    number: Number,
    zipcode: String,
});
// Define main schema for user data
const UserSchema = new mongoose_1.Schema({
    email: String,
    username: String,
    password: String,
    name: NameSchema,
    address: AddressSchema,
    phone: String
});
// Create and export the Mongoose model
const UserModel = mongoose_1.default.model('User', UserSchema);
exports.UserModel = UserModel;
