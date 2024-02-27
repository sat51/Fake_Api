import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';
import { IProduct } from '../models/product.model'; // Assuming IProduct is the interface for product model




const productSchema: Schema<IProduct> = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    category: Joi.string().required()
});



export default productSchema;


