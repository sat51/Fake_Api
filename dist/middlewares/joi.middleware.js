"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateCartSchema = exports.validateCreateUserSchema = exports.validateCreateProductSchema = void 0;
const product_validator_1 = require("../validators/product.validator");
function validateCreateProductSchema(req, res, next) {
    const { error } = product_validator_1.productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}
exports.validateCreateProductSchema = validateCreateProductSchema;
function validateCreateUserSchema(req, res, next) {
    const { error } = product_validator_1.UserSchemaJoi.validate(req.body);
    // console.log(`--------->`,req)
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}
exports.validateCreateUserSchema = validateCreateUserSchema;
function validateCreateCartSchema(req, res, next) {
    const { error } = product_validator_1.OrderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}
exports.validateCreateCartSchema = validateCreateCartSchema;
