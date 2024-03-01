"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.UserSchemaJoi = exports.productSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const productSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    description: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    category: joi_1.default.string().required()
});
exports.productSchema = productSchema;
const ProductItemSchema = joi_1.default.object({
    productId: joi_1.default.number().required(),
    quantity: joi_1.default.number().required()
});
// Define a Joi schema for the order
const OrderSchema = joi_1.default.object({
    // userId: Joi.string().required(),
    date: joi_1.default.string().required(),
    products: joi_1.default.array().items(ProductItemSchema).required()
});
exports.OrderSchema = OrderSchema;
//user validator
// Joi schema for the NameSchema
const NameSchemaJoi = joi_1.default.object({
    firstname: joi_1.default.string().required(),
    lastname: joi_1.default.string().required()
});
// Joi schema for the AddressSchema
const AddressSchemaJoi = joi_1.default.object({
    city: joi_1.default.string().required(),
    street: joi_1.default.string().required(),
    number: joi_1.default.number().integer().required(),
    zipcode: joi_1.default.string().required()
});
// Joi schema for the UserSchema
const UserSchemaJoi = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    name: NameSchemaJoi.required(),
    address: AddressSchemaJoi.required(),
    phone: joi_1.default.string()
});
exports.UserSchemaJoi = UserSchemaJoi;
