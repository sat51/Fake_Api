import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';
import { IProduct } from '../models/product.model'; // Assuming IProduct is the interface for product model
import { IUser } from '../models/user_model';
// import { IOrder } from '../models/cart.model';




const productSchema: Schema<IProduct> = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    category: Joi.string().required()
});

const ProductItemSchema = Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().required()
});

// Define a Joi schema for the order
// const OrderSchema :Schema<IOrder>= Joi.object({
//     // userId: Joi.string().required(),
//     date: Joi.string().required(),
//     products: Joi.array().items(ProductItemSchema).required()
// });

//user validator

// Joi schema for the NameSchema
const NameSchemaJoi = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required()
});

// Joi schema for the AddressSchema
const AddressSchemaJoi = Joi.object({
    city: Joi.string().required(),
    street: Joi.string().required(),
    number: Joi.number().integer().required(),
    zipcode: Joi.string().required()
});

// Joi schema for the UserSchema
const UserSchemaJoi:Schema<IUser> = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: NameSchemaJoi.required(),
    address: AddressSchemaJoi.required(),
    phone: Joi.string()
});




export  {productSchema,UserSchemaJoi};






