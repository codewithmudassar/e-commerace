import { ProductsModel } from "@/backend/models";
import dbConnect from "@/backend/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const id = req.query.id || req.body._id;

        const getSingle = await ProductsModel.findById(id)
        .populate("category", "title")

        res.status(200).json({
          succcess: true,
          getSingle,
        });
      } catch (error) {
        console.log(error);
      }

      break;

    case "DELETE":
      try {
        const id = req.query.id
        const get = await ProductsModel.findByIdAndDelete(id);

        if (!get) {
          res.status(200).json({
            succcess: false,
            message: "product not found",
          });
        }

        res.status(200).json({
          succcess: true,
          message: "product deleted",
        });
        console.log(error);
      } catch (error) {}

      break;

    case "PUT":
      try {
        const id = req.query.id;

        const getOne = await ProductsModel.findByIdAndUpdate(
          id,
          { $set: req.body },
          { new: true }
        );

        res.status(200).json({
          succcess: true,
          message: getOne,
        });
      } catch (error) {
        console.log(error);
      }

      break;

    default:
      res.status(405).json({
        succcess: false,
        message: "Method not Allowed",
      });
  }
}
