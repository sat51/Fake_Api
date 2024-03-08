"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./connection"));
const user_route_1 = __importDefault(require("../routes/user.route"));
//import auth from '../middlewares/auth.middleware'
const product_routes_1 = __importDefault(require("../routes/product.routes"));
const cart_routes_1 = __importDefault(require("../routes/cart.routes"));
const api_handler_1 = require("../utils/api_handler");
const rateLimit_1 = require("../middlewares/rateLimit");
// Initialize Express application
const app = (0, express_1.default)();
(0, connection_1.default)();
app.use(rateLimit_1.rateLimiterUsingThirdParty);
app.use(api_handler_1.loggingMiddleware);
app.use('/cart', cart_routes_1.default);
app.use('/user', user_route_1.default);
app.use('/product', product_routes_1.default);
// app.use('/cart',cart)
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
