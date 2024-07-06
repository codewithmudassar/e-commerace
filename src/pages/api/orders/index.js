import products from "@/backend/models";
import dbConnect from "@/backend/dbConnect";
import { orderModel } from "@/backend/models";

export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "GET":
      try {
        var match = {};

        if (req.query.id) {
          match._id = req.query.id;
        } else if (req.query.isLoginUserName) {
          match.isLoginUserName = req.query.isLoginUserName;
        }

        var foundOrders = await orderModel.find(match)
          .populate({
            path: "items.productID",
            modal: products,
            select: ["title", "images", "stock"],
          })
          .populate("hasLoginUserData", "fullName email");

        foundOrders = foundOrders.map((order) => {
          var total = 0;
          order.items.map((v) => {
            total = total + v.quantity * v.unitPrice;
          });

          var obj = { ...order._doc, total };
          return obj;
        });

        res.json({
          success: true,
          message: foundOrders,
        });
      } catch (error) {
        res.json({
          success: false,
          message: error.message,
        });
      }
      break;
    case "POST":
      try {
        var order = await orderModel.create(req.body);

        res.json({
          success: true,
          message: order,
        });
      } catch (error) {
        res.json({
          success: false,
          message: error.message,
        });
      }
      break;
    case "PUT":
      try {
        await orderModel.findByIdAndUpdate(req.body._id, { $set: req.body });

        res.json({
          success: true,
          message: "Order Updated Successfully!",
        });
      } catch (error) {
        res.json({
          success: false,
          message: error.message,
        });
      }
      break;
    case "DELETE":
      try {
        await orderModel.findByIdAndDelete(req.query.id);

        res.json({
          success: true,
          message: "Order Deleted Successfully!",
        });
      } catch (error) {
        console.log(error);

        res.json({
          success: false,
          message: error.message,
        });
      }
      break;
  }
}