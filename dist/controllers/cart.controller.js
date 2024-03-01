"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartInRange = exports.sortCarts = exports.userCart = exports.deleteSingleCart = exports.updateSingleCart = exports.getAllCart = exports.getSingleCart = exports.addCart = void 0;
const cart_services_1 = require("../services/cart.services");
const addCart = async (req, res) => {
    const userId = req.userId;
    const data = req.body;
    try {
        const response = await (0, cart_services_1.handleaddCart)(data, userId);
        res.status(200).json({ response });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.addCart = addCart;
const getSingleCart = async (req, res) => {
    const cartId = req.params.id;
    try {
        const response = await (0, cart_services_1.handleSingleCart)(cartId);
        res.status(200).json({ response });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getSingleCart = getSingleCart;
const getAllCart = async (req, res) => {
    try {
        const response = await (0, cart_services_1.handleAllCart)();
        res.status(200).json({ response });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getAllCart = getAllCart;
const updateSingleCart = async (req, res) => {
    const cartId = req.params.id;
    const cartData = req.body;
    try {
        const response = await (0, cart_services_1.handleupdateSingleCart)(cartId, cartData);
        res.status(200).json({ response });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.updateSingleCart = updateSingleCart;
const deleteSingleCart = async (req, res) => {
    const cartId = req.params.id;
    try {
        const response = await (0, cart_services_1.handleDeleteSingleCart)(cartId);
        res.status(200).json({ response });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.deleteSingleCart = deleteSingleCart;
const userCart = async (req, res) => {
    const userId = req.userId;
    try {
        const result = await (0, cart_services_1.handleUserCart)(userId);
        res.status(200).json({ result });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.userCart = userCart;
const sortCarts = async (req, res) => {
    const order = req.params.order;
    try {
        const result = await (0, cart_services_1.handleSortCarts)(order);
        res.status(200).json({ result });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.sortCarts = sortCarts;
const getCartInRange = async (req, res) => {
    const startDateparam = req.query.startDate;
    const endDateparam = req.query.endDate;
    try {
        const result = await (0, cart_services_1.handleCartInRange)(startDateparam, endDateparam);
        res.status(200).json({ result });
    }
    catch (err) {
        res.status(500).json({ err });
    }
};
exports.getCartInRange = getCartInRange;
