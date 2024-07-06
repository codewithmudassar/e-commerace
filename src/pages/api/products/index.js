import { ProductsModel } from "@/backend/models";
import dbConnect from "@/backend/dbConnect";

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        var match = {};

        if (req.query.title) {
          match.title = new RegExp(req.query.title, "i");
        } else if (req.query.getFull) {
          var product = await ProductsModel.find();
          res.send({
            success: true,
            message: product,
          });
        }

        var products = await ProductsModel.find(match, { seo: 0 }).limit(4)
          .populate("category", "title")
          .sort({ createdAt: -1 });
        res.send({
          success: true,
          message: products,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          massage: error.message,
        });
      }
      break;
    case "POST":
      try {
        const product = await ProductsModel.create(req.body);

        res.json({
          success: true,
          Message: product,
        });
      } catch (error) {
        if (error.code == 11000) {
          res.status(409).json({
            success: false,
            Message: "title is already in use!",
          });
          return;
        }
        res.status(500).json({
          success: false,
          massage: error.message,
        });

        break;
      }
  }
}
