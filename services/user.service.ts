import { IUser,UserModel } from "../models/user_model";
import bcrypt from "bcrypt";
import { string } from "joi";
import jwt from 'jsonwebtoken';


const handleaddUser = async(data:IUser) =>{
    const { email, username, password } = data;
    //console.log(email);
    try {
        // Check if user with the email or username already exists
        const existingUser: IUser | null = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return "user already exists";
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        // Create a new user
        data.password=hashedPassword;
        const newUser = new UserModel(data);
        await newUser.save();

        // Create and sign a JWT token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!);

        return token;
    } catch (error:any) {
       throw error
    }
};

const handleLogin = async(data:Partial<IUser>) =>{
    const { email, password } = data as { email: string, password: string };
    try {
        // Replace this with your actual logic to fetch user data from the database
        const user = await UserModel.findOne({ email });

        // Check if user exists and if password is correct
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return "Invalid email or password";
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
        return token;
    } catch (error:any) {
        console.error('Login error:', error.message);
        throw error;
    }
}

const handlegetAll = async():Promise<IUser[] | null> => {
    try{
        const result:IUser[] = await UserModel.find();
        return result;
    }
    catch(err:any){
        throw err;
    }
}

const handleSingleUser = async(id:string | null):Promise<IUser | null>=> {
    try{
        const result = await UserModel.findById(id);
        // console.log(result);
        return result;
        //return result;
    }
    catch(err:any){
        throw err;
    }
}
const handleLimitedUser = async(data_limit:string):Promise<IUser[] | null> =>{
     try{
        const limited = parseInt(data_limit,10);
        const result = await UserModel.find().limit(limited);
        return result;
     }
     catch(err:any){
        throw err;
     }
}

const handleUpdateUser = async(userid:string, data:Partial<IUser>):Promise<IUser|null> =>{
    try{
        const result = await UserModel.findByIdAndUpdate(userid,data,{new:true});
        return result;
    }
    catch(err:any){
        throw err;
    }
}

const handledeleteUser = async(userid:string) =>{
    try{
        const result = await UserModel.findByIdAndDelete(userid);
        return "user deleted ";
    }catch(err:any){
        throw err;
    }
    
    

}

export { handleaddUser,
    handleLogin,handlegetAll,handleSingleUser,handleLimitedUser,handleUpdateUser,handledeleteUser};



