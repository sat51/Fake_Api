import mongoose, { Schema, Document } from 'mongoose';

// Define sub-schema for name
const NameSchema = new Schema({
    firstname: String,
    lastname: String
});


// Define sub-schema for address
const AddressSchema = new Schema({
    city: String,
    street: String,
    number: Number,
    zipcode: String,
});

// Define main schema for user data
const UserSchema = new Schema({
    email: String,
    username: String,
    password: String,
    name: NameSchema,
    address: AddressSchema,
    phone: String
});

// Define a TypeScript interface for the document (optional but recommended)
interface IUser extends Document {
    email: string;
    username: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    };
    address: {
        city: string;
        street: string;
        number: number;
        zipcode: string;
    };
    phone: string;
}

// Create and export the Mongoose model
const UserModel = mongoose.model<IUser>('User', UserSchema);

export  { UserModel,IUser};
