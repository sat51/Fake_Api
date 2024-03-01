"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiterUsingThirdParty = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.rateLimiterUsingThirdParty = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000, // 24 hrs in milliseconds
    max: 10,
    message: 'You have exceeded the 100 requests in 24 hrs limit!',
    standardHeaders: true,
    legacyHeaders: false,
});
