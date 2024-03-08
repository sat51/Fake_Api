"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getupdateProducts = exports.getProductsByCategory = exports.getallcategories = exports.getByOrder = exports.getByLimit = exports.getAll = exports.getSingle = exports.addProduct = void 0;
const express_1 = __importDefault(require("express"));
const product_services_1 = require("../services/product.services");
const router = express_1.default.Router();
// Route to add a new product
router.use(express_1.default.json());
const addProduct = (req, res) => {
    // Call the getProductSchemaMiddleware middleware to validate the product data
    const productData = req.body;
    // Call the addProduct service function to add the product
    (0, product_services_1.handleaddProduct)(productData)
        .then((savedProduct) => {
        // If the product is successfully added, return a 200 OK response with the saved product data
        return res.status(200).json({ message: 'Product added successfully', product: savedProduct });
    })
        .catch((error) => {
        console.error('Error adding product:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    });
};
exports.addProduct = addProduct;
//get a single product
const getSingle = (req, res) => {
    const data = req.params.id;
    (0, product_services_1.handleSingle)(data)
        .then((response) => {
        // If the service function returns a successful response, send it to the client
        res.json(response);
    })
        .catch((error) => {
        // If an error occurs in the service function, send an error response to the client
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    });
};
exports.getSingle = getSingle;
//get all product
const getAll = (req, res) => {
    (0, product_services_1.handleAll)()
        .then((response) => {
        // If the service function returns a successful response, send it to the client
        res.json(response);
    })
        .catch((error) => {
        // If an error occurs in the service function, send an error response to the client
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    });
};
exports.getAll = getAll;
const getByLimit = (req, res) => {
    const limit = req.params.limit;
    // Example usage: Limit the results to 10
    (0, product_services_1.handleAllByLimit)(limit)
        .then((response) => {
        res.json(response); // Handle the products array here
    })
        .catch((error) => {
        console.error('Error:', error.message);
        res.status(500).json({
            error: 'Internal server error'
        });
    });
};
exports.getByLimit = getByLimit;
const getByOrder = (req, res) => {
    const sortOrder = req.params.order;
    (0, product_services_1.handleByOrder)(sortOrder)
        .then((response) => {
        res.json(response);
    })
        .catch((error) => {
        res.status(500).json({
            error: error.message
        });
    });
};
exports.getByOrder = getByOrder;
const getallcategories = (req, res) => {
    (0, product_services_1.handlegetAllCategories)()
        .then((response) => {
        res.json(response);
    })
        .catch((error) => {
        res.status(500).json({ message: error.message });
    });
};
exports.getallcategories = getallcategories;
const getProductsByCategory = (req, res) => {
    const category = req.params.category;
    (0, product_services_1.handleByCategory)(category)
        .then((response) => {
        res.status(200).json(response);
    })
        .catch((err) => {
        res.status(500).json({ message: err.message });
    });
};
exports.getProductsByCategory = getProductsByCategory;
const getupdateProducts = (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    (0, product_services_1.handleUpdatedProduct)(updateData, id)
        .then((response) => {
        res.status(200).json(response);
    })
        .catch((err) => {
        res.status(500).json({ message: err.message });
    });
};
exports.getupdateProducts = getupdateProducts;
const deleteProduct = (req, res) => {
    const userid = req.params.id;
    (0, product_services_1.handleDelete)(userid)
        .then((response) => {
        res.status(200).json(response);
    })
        .catch((err) => {
        res.status(500).json({ message: err.message });
    });
};
exports.deleteProduct = deleteProduct;
