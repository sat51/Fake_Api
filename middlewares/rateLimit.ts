import rateLimit from 'express-rate-limit';

export const rateLimiterUsingThirdParty = rateLimit({
  windowMs:  60 * 1000, // 24 hrs in milliseconds
  max: 10,
  message: 'You have exceeded the 10 requests in 1 min limit!', 
  standardHeaders: true,
  legacyHeaders: false,
});