"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToCartService = exports.handleCartInRange = exports.handleSortCarts = exports.handleUserCart = exports.handleDeleteSingleCart = exports.handleupdateSingleCart = exports.handleAllCart = exports.handleSingleCart = exports.handleaddCart = void 0;
const cart_model_1 = require("../models/cart.model");
const handleaddCart = async (cartData, userId) => {
    try {
        cartData.userId = userId;
        // const productIdToFind = cartData.products.some(product => product.productId === productIdToFind)
        const check = await cart_model_1.OrderModel.findOne({ userId });
        // if(check){
        //     const productFound = OrderModel.find({cartData.products.some(product => product.productId === productIdToFind);})
        // }
        if (!check) {
            const newCart = new cart_model_1.OrderModel(cartData);
            const savedCart = await newCart.save();
            return savedCart;
        }
        else {
            return "cart already exists";
        }
    }
    catch (err) {
        throw err;
    }
};
exports.handleaddCart = handleaddCart;
const handleSingleCart = async (cartId) => {
    try {
        const result = await cart_model_1.OrderModel.findById(cartId);
        return result;
    }
    catch (err) {
        throw err;
    }
};
exports.handleSingleCart = handleSingleCart;
const handleAllCart = async () => {
    try {
        const result = await cart_model_1.OrderModel.find();
        return result;
    }
    catch (err) {
        throw err;
    }
};
exports.handleAllCart = handleAllCart;
const handleupdateSingleCart = async (cartId, cartData) => {
    try {
        const result = cart_model_1.OrderModel.findByIdAndUpdate(cartId, cartData, { new: true });
        return result;
    }
    catch (err) {
        throw err;
    }
};
exports.handleupdateSingleCart = handleupdateSingleCart;
const handleDeleteSingleCart = async (cartId) => {
    try {
        const result = await cart_model_1.OrderModel.findByIdAndDelete(cartId);
        return result;
    }
    catch (err) {
        throw err;
    }
};
exports.handleDeleteSingleCart = handleDeleteSingleCart;
const handleUserCart = async (userId) => {
    try {
        const result = await cart_model_1.OrderModel.find({ userId });
        return result;
    }
    catch (err) {
        throw err;
    }
};
exports.handleUserCart = handleUserCart;
const handleSortCarts = async (cartOrder) => {
    try {
        let query = cart_model_1.OrderModel.find();
        if (cartOrder === 'asc') {
            query = query.sort({ _id: 1 }); // Sorting in ascending order by default
        }
        else if (cartOrder === 'desc') {
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
exports.handleSortCarts = handleSortCarts;
const handleCartInRange = async (start_Date, end_Date) => {
    const result = await cart_model_1.OrderModel.find({
        date: { $gte: start_Date, $lte: end_Date }
    });
    return result;
};
exports.handleCartInRange = handleCartInRange;
// const addProductToCart = async(userId:string,data:any) =>{
//     const check:any = await OrderModel.findOne({userId});
//     const newProductId = data.productId;
//     const validate = check.products.some(element =>
//     })
// }
const addProductToCartService = async (id, productId, quantity) => {
    console.log({ id });
    const cart = await cart_model_1.OrderModel.findOne({ userId: id });
    // console.log(cart);
    if (!cart) {
        return new Error("cart is empty");
    }
    const products = cart.products;
    let found = false;
    for (let i = 0; i < products.length; i++) {
        if (products[i].productId === productId) {
            products[i].quantity = products[i].quantity + quantity;
            found = true;
            break;
        }
    }
    if (!found) {
        products.push({ productId: productId, quantity: quantity });
    }
    console.log(cart.products);
    console.log({ id });
    const temp = await cart_model_1.OrderModel.findOne({ userId: id });
    return cart_model_1.OrderModel.updateOne({ userId: id }, { products: cart.products });
};
exports.addProductToCartService = addProductToCartService;
