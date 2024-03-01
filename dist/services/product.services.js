"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDelete = exports.handleUpdatedProduct = exports.handleByCategory = exports.handlegetAllCategories = exports.handleByOrder = exports.handleAllByLimit = exports.handleAll = exports.handleaddProduct = exports.handleSingle = void 0;
const product_model_1 = require("../models/product.model");
const handleSingle = async (productId) => {
    try {
        const result = await product_model_1.ProductModel.findById(productId);
        return result;
    }
    catch (err) {
        throw err;
    }
};
exports.handleSingle = handleSingle;
// import { ProductModel, IProduct } from './models/product.model';
const handleaddProduct = async (data) => {
    try {
        // Create a new product instance with the provided data
        const newProduct = new product_model_1.ProductModel(data);
        // Save the new product to the database
        const savedProduct = await newProduct.save();
        // Return the saved product
        return savedProduct;
    }
    catch (error) {
        // If an error occurs, throw the error to be handled by the caller
        throw error;
    }
};
exports.handleaddProduct = handleaddProduct;
const handleAll = async () => {
    try {
        const result = await product_model_1.ProductModel.find();
        return result;
    }
    catch (err) {
        throw err;
    }
};
exports.handleAll = handleAll;
const handleAllByLimit = async (limit) => {
    try {
        const limitNumber = parseInt(limit, 10);
        const result = await product_model_1.ProductModel.find().limit(limitNumber);
        return result;
    }
    catch (err) {
        throw err;
    }
};
exports.handleAllByLimit = handleAllByLimit;
const handleByOrder = async (sortOrder) => {
    try {
        let query = product_model_1.ProductModel.find();
        if (sortOrder === 'asc') {
            query = query.sort({ _id: 1 }); // Sorting in ascending order by default
        }
        else if (sortOrder === 'desc') {
            query = query.sort({ _id: -1 }); // Sorting in descending order
        }
        else {
            throw new Error('Invalid sortOrder'); // Throw an error for invalid sortOrder
        }
        const result = await query.exec();
        return result;
    }
    catch (err) {
        throw err;
    }
};
exports.handleByOrder = handleByOrder;
//getallcategories
const handlegetAllCategories = async () => {
    try {
        const categories = await product_model_1.ProductModel.distinct('category');
        // if(categories.length !== 0){
        //     return []
        // }
        return categories;
    }
    catch (error) {
        throw error;
    }
};
exports.handlegetAllCategories = handlegetAllCategories;
const handleByCategory = async (category) => {
    try {
        const result = await product_model_1.ProductModel.find({ category });
        return result;
    }
    catch (err) {
        throw err;
    }
};
exports.handleByCategory = handleByCategory;
const handleUpdatedProduct = async (data, productId) => {
    try {
        const updatedProduct = await product_model_1.ProductModel.findByIdAndUpdate(productId, data, { new: true });
        return updatedProduct;
    }
    catch (err) {
        throw err;
    }
};
exports.handleUpdatedProduct = handleUpdatedProduct;
const handleDelete = async (productId) => {
    try {
        await product_model_1.ProductModel.findByIdAndDelete(productId);
        return "product deleted";
    }
    catch (err) {
        throw err;
    }
};
exports.handleDelete = handleDelete;
