import { Query } from "mongoose";
import { IOrder, OrderModel } from "../models/cart.model";



const handleaddCart = async (cartData: Partial<IOrder>, userId: string):Promise<IOrder> => {
    try {
        cartData.userId = userId;
        const newCart = new OrderModel(
            cartData
        );
        const savedCart = await newCart.save();
        return savedCart;
    }
    catch (err) {
        throw err;
    }

}

const handleSingleCart = async (cartId: string): Promise<IOrder | null> => {
    try {
        const result = await OrderModel.findById(cartId);
        return result;
    } catch (err: any) {
        throw err;
    }
}

const handleAllCart = async (): Promise<IOrder[] | null> => {
    try {
        const result = await OrderModel.find();
        return result;
    } catch (err: any) {
        throw err;
    }
}

const handleupdateSingleCart = async (cartId: string, cartData: Partial<IOrder>): Promise<IOrder | null> => {
    try {
        const result = OrderModel.findByIdAndUpdate(cartId, cartData, { new: true });
        return result;
    }
    catch (err: any) {
        throw err;
    }
}

const handleDeleteSingleCart = async (cartId: string):Promise<IOrder | null > => {
    try {
        const result : IOrder | null = await OrderModel.findByIdAndDelete(cartId);
        return result;
    } catch (err: any) {
        throw err;
    }
}

const handleUserCart = async (userId: string) => {
    try {
        const result = await OrderModel.find({ userId });
        return result;
    } catch (err: any) {
        throw err;
    }
}

const handleSortCarts = async (cartOrder: string) :Promise<IOrder[]>=> {
    try {
        let query: Query<IOrder[], IOrder> = OrderModel.find();

        if (cartOrder === 'asc') {
            query = query.sort({ _id: 1 }); // Sorting in ascending order by default
        } else if (cartOrder === 'desc') {
            query = query.sort({ _id: -1 }); // Sorting in descending order
        } else {
            throw new Error('Invalid sortOrder'); // Throw an error for invalid sortOrder
        }

        const result = await query.exec();
        return result;
    } catch (err: any) {
        throw err;
    }
}

const handleCartInRange = async (start_Date: any , end_Date: any): Promise<IOrder[] | IOrder | null> => {

    const result = await OrderModel.find({
        date: { $gte: start_Date, $lte: end_Date }
    })
    return result;


}

export {
    handleaddCart,
    handleSingleCart,
    handleAllCart,
    handleupdateSingleCart,
    handleDeleteSingleCart,
    handleUserCart,
    handleSortCarts,
    handleCartInRange
};