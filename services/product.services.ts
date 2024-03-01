import { ProductModel,IProduct } from '../models/product.model'
import { Query } from 'mongoose';

const handleSingle = async(productId:string) =>{
        try{
            const result = await ProductModel.findById(productId);
            return result;
        }catch(err:any){
            throw err;
        }
}

// import { ProductModel, IProduct } from './models/product.model';

const handleaddProduct = async (data: IProduct): Promise<IProduct> => {
    try {
        // Create a new product instance with the provided data
        const newProduct = new ProductModel(data);
        
        // Save the new product to the database
        const savedProduct = await newProduct.save();

        // Return the saved product
        return savedProduct;
    } catch (error) {
        // If an error occurs, throw the error to be handled by the caller
        throw error;
    }
};

const handleAll = async() : Promise<IProduct[]>=>{
    try{
        const result =  await ProductModel.find();
        return result;
    }
    catch(err:any){
        throw err;
    }
}

const handleAllByLimit = async (limit: string): Promise<IProduct[]> => {
    try {
        const limitNumber = parseInt(limit, 10);
        const result = await ProductModel.find().limit(limitNumber);
        return result;
    } catch (err:any) {
        throw err;
    }
}

const handleByOrder = async ( sortOrder: string): Promise<IProduct[]> => {
    try {

        let query: Query<IProduct[], IProduct>=ProductModel.find();
        
        if (sortOrder === 'asc') {
            query = query.sort({ _id: 1 }); // Sorting in ascending order by default
        } else if (sortOrder === 'desc') {
            query = query.sort({ _id: -1 }); // Sorting in descending order
        } else {
            throw new Error('Invalid sortOrder'); // Throw an error for invalid sortOrder
        }

        const result = await query.exec();
        return result;
    } catch (err:any) {
        throw err;
    }
}

//getallcategories
const handlegetAllCategories = async () :Promise<string[]>=> {
    try {
        const categories: string[] = await ProductModel.distinct('category');
        // if(categories.length !== 0){
        //     return []
        // }
        return categories;
    } catch (error) {
        throw error;
    }
};


const handleByCategory  = async(category:string) :Promise<IProduct[]>=>{
    try{
        const result : IProduct[] =await ProductModel.find({category});
        return result;
    }
    catch(err:any){
        throw err;
    }
}

const handleUpdatedProduct = async(data:Partial<IProduct>,productId:string) =>{
    try{
        const updatedProduct: IProduct | null = await ProductModel.findByIdAndUpdate(productId, data, { new: true });
        return updatedProduct;
    }
    catch(err){
        throw err;
    }
}

const handleDelete = async(productId:string) =>{
    try{
        await ProductModel.findByIdAndDelete(productId);
        return "product deleted"
    }
    catch(err){
        throw err;
    }
}

export  {
    handleSingle,
    handleaddProduct,handleAll,
    handleAllByLimit,
    handleByOrder,
    handlegetAllCategories,handleByCategory,
    handleUpdatedProduct,
    handleDelete
};