import express, { Request, Response, NextFunction, response } from 'express';
import { handleSingle, handleaddProduct, handleAll, handleAllByLimit, handleByOrder, handlegetAllCategories, handleByCategory, handleUpdatedProduct, handleDelete } from '../services/product.services';
import { IProduct } from '../models/product.model';





const router = express.Router();

// Route to add a new product
router.use(express.json());


const addProduct = (req: Request, res: Response) => {
    // Call the getProductSchemaMiddleware middleware to validate the product data

    const productData = req.body;
    // Call the addProduct service function to add the product
    handleaddProduct(productData)
        .then((savedProduct) => {
            // If the product is successfully added, return a 200 OK response with the saved product data
            return res.status(200).json({ message: 'Product added successfully', product: savedProduct });
        })
        .catch((error) => {
            console.error('Error adding product:', error.message);
            return res.status(500).json({ error: 'Internal server error' });
        });
}






//get a single product

const getSingle = (req: Request, res: Response) => {
    const data: string = req.params.id;
    handleSingle(data)
        .then((response) => {
            // If the service function returns a successful response, send it to the client
            res.json(response);
        })
        .catch((error) => {
            // If an error occurs in the service function, send an error response to the client
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        });
}

//get all product
const getAll = (req: Request, res: Response) => {

    handleAll()
        .then((response) => {
            // If the service function returns a successful response, send it to the client
            res.json(response);
        })
        .catch((error) => {
            // If an error occurs in the service function, send an error response to the client
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Internal server error' });
        });
}

const getByLimit = (req: Request, res: Response) => {
    const limit: string = req.params.limit;
    // Example usage: Limit the results to 10
    handleAllByLimit(limit)
        .then((response) => {
            res.json(response); // Handle the products array here
        })
        .catch((error) => {
            console.error('Error:', error.message);
            res.status(500).json({
                error: 'Internal server error'
            });
        });
}

const getByOrder = (req:Request,res:Response) =>{

    const sortOrder = req.params.order;
    handleByOrder(sortOrder)
    .then((response)=>{
        res.json(response);
    })
    .catch((error:any)=>{
        res.status(500).json({
            error: error.message
        });
    })

}
const getallcategories = (req:Request,res:Response) =>{
    handlegetAllCategories()
    .then((response)=>{
        res.json(response)
    })
    .catch((error:any)=>{
        res.status(500).json({message:error.message});
    })
}

const getProductsByCategory = (req:Request,res:Response) =>{
    const category:string = req.params.category;
    handleByCategory(category)
    .then((response)=>{
        res.status(200).json(response);
    })
    .catch((err)=>{
        res.status(500).json({message:err.message});
    })
    
}

const getupdateProducts = (req:Request,res:Response) =>{
    const id = req.params.id;
    const updateData: Partial<IProduct> = req.body;

    handleUpdatedProduct(updateData,id)
    .then((response)=>{
        res.status(200).json(response);
    })
    .catch((err)=>{
        res.status(500).json({message:err.message});
    })

}

const deleteProduct = (req:Request,res:Response) =>{
    const userid = req.params.id;
    handleDelete(userid)
    .then((response) => {
        res.status(200).json(response);
    })
    .catch((err:any)=>{
        res.status(500).json({message:err.message});
    })
}

export {
    addProduct,
    getSingle, getAll,
    getByLimit,
    getByOrder,
    getallcategories,
    getProductsByCategory,getupdateProducts,
    deleteProduct
}

