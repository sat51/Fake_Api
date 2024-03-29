"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const joi_middleware_1 = require("../middlewares/joi.middleware");
const router = express_1.default.Router();
router.use(express_1.default.json());
router.post('/add', joi_middleware_1.validateCreateProductSchema, product_controller_1.addProduct);
router.get('/single/:id', product_controller_1.getSingle);
router.get('/all', product_controller_1.getAll);
router.get('/all/:limit', product_controller_1.getByLimit);
router.get('/all/order/:order', product_controller_1.getByOrder);
router.get('/category', product_controller_1.getallcategories);
router.get('/category/:category', product_controller_1.getProductsByCategory);
router.put('/update/:id', product_controller_1.getupdateProducts);
router.delete('/delete/:id', product_controller_1.deleteProduct);
exports.default = router;
