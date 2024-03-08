import { Query } from "mongoose";
import { IOrder, OrderModel } from "../models/cart.model";
import { IProduct } from "../models/cart.model";



const handleaddCart = async (cartData: Partial<IOrder>, userId: string):Promise<IOrder | string> => {
    try {
        cartData.userId = userId;
        // const productIdToFind = cartData.products.some(product => product.productId === productIdToFind)
        const check:any= await OrderModel.findOne({userId});
      
        
        // if(check){
        //     const productFound = OrderModel.find({cartData.products.some(product => product.productId === productIdToFind);})
        // }
        if(!check){
            const newCart = new OrderModel(
                cartData
            );
            const savedCart = await newCart.save();
            return savedCart;
        }
        else{
            return "cart already exists";
        }
     
       
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

// const addProductToCart = async(userId:string,data:any) =>{
//     const check:any = await OrderModel.findOne({userId});
//     const newProductId = data.productId;
//     const validate = check.products.some(element =>

//     })
// }

const addProductToCartService = async (id: string, productId:number,quantity:number) => {
    console.log({id})
    const cart = await OrderModel.findOne({ userId: id });
    // console.log(cart);
    if(!cart){
        return new Error("cart is empty")
    }
    
    const products: IProduct[]  = cart.products;
    let found = false;
    for (let i = 0; i < products.length; i++) {
      if (products[i].productId === productId) {
        products[i].quantity = products[i].quantity + quantity;
        found = true;
        break;
      }
    }
    if (!found) {
      products!.push({ productId: productId, quantity: quantity });
    }
    console.log(cart.products);
    console.log({id});
    const temp = await OrderModel.findOne({userId: id});
    return OrderModel.updateOne({ userId: id }, {  products: cart.products  });
  };

export {
    handleaddCart,
    handleSingleCart,
    handleAllCart,
    handleupdateSingleCart,
    handleDeleteSingleCart,
    handleUserCart,
    handleSortCarts,
    handleCartInRange,addProductToCartService
};