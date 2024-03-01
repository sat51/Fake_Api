
import express, { Application, Request, Response } from 'express';
import connectDb from './connection';
import user from '../routes/user.route'
//import auth from '../middlewares/auth.middleware'
import productRoute from '../routes/product.routes'
import cart from '../routes/cart.routes'
import { loggingMiddleware } from '../utils/api_handler';
// Initialize Express application
const app: Application = express();

connectDb();

app.use(loggingMiddleware);
app.use('/cart',cart);
app.use('/user',user);
app.use('/product',productRoute);
// app.use('/cart',cart)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

// Start the server
const PORT: number = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

