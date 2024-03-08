"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const joi_middleware_1 = require("../middlewares/joi.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.use(express_1.default.json());
router.post('/signup', joi_middleware_1.validateCreateUserSchema, user_controller_1.createUser);
router.post('/login', user_controller_1.loginUser);
router.get('/all', auth_middleware_1.auth, user_controller_1.getAllUser);
router.get('/single', auth_middleware_1.auth, user_controller_1.getSingleUser);
router.get('/limit/:limit', user_controller_1.getLimitedUser);
router.put('/update', auth_middleware_1.auth, user_controller_1.updateUser);
router.delete('/delete', user_controller_1.deleteUser);
exports.default = router;
