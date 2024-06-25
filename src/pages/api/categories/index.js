import { CategoryModel } from "@/backend/models";
import dbConnect from "@/backend/dbConnect";

export default async function handler(req, res) {
    await dbConnect()

    switch (req.method) {
        case"GET":
            try {
                var categories = await CategoryModel.find()
                res.send({
                    success:true,
                    message:categories
                })


            } catch (error) {
                res.status(500).json({
                    success:false,
                    massage:error.message
                })
            }
            break;
        case "POST":
            try {
                const category= await CategoryModel.create(req.body)

                res.json({
                    success:true,
                    Message:category
                })

            } catch (error) {

                if(error.code == 11000){
                    res.status(409).json({
                        success:false,
                        Message:"title is already in use!"
                    })
                    return
                }
                res.status(500).json({
                    success:false,
                    massage:error.message
                })

                break;

            }



    }
}