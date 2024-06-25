import mongoose from "mongoose";

export default async function dbConnect(){
    try {
         if (mongoose.connection.readyState >=1) {
            return
         }

         await mongoose.connect("mongodb://127.0.0.1:27017/e-commerce")
    } catch (error) {
        console.log(error)
        return false
    }
}





