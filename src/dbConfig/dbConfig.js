import mongoose from "mongoose";

export default connectDb = async() =>{
    try {
        let connect = await mongoose.connect(process.env.MONGO_URL);
        if(connect){
            console.log('DB connected Successfully');
        } 
    } catch (error) {
        console.log(error.message);
    }
}
