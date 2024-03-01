import { string } from 'joi';
import mongoose, { Document, Schema,Model } from 'mongoose';

// Define a schema for the individual product item
const ProductItemSchema = new Schema({
    productId: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

// Define a schema for the order
const OrderSchema = new Schema({
    userId: { type: String, required: true },
    date: { type: String, required: true },
    products: { type: [ProductItemSchema], required: true }
});

// Define an interface representing the document in MongoDB
interface IOrder extends Document {
    userId: string;
    date: string;
    products: {
        productId: number;
        quantity: number;
    }[];
}

// Create and export the Mongoose model for the order
const OrderModel: Model<IOrder> = mongoose.model<IOrder>('Order', OrderSchema);

export {
    OrderModel,
    IOrder
};
