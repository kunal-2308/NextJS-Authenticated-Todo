import mongoose from "mongoose";

const connectDb = async() =>{
    try {
        let connect = await mongoose.connect(process.env.MONGO_URL);
        if(connect){
            console.log('DB connected Successfully');
        } 
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDb;