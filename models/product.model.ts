import mongoose, { Schema, Document } from 'mongoose';

// Define interface representing the product data structure
interface IProduct extends Document {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

// Define Mongoose schema for the product data
const ProductSchema: Schema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }
});

// Create and export the Mongoose model for the product data
const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);

export { ProductModel, IProduct };
