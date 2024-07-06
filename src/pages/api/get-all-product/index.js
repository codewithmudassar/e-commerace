import dbConnect from "@/backend/dbConnect";
import { ProductsModel } from "@/backend/models";

export default async function handler(req, res) {
  dbConnect();

  try {
    let match = {};
    let ProductData = {};

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 8;
    const skip = (page - 1) * limit;

    if (req.query.minPrice || req.query.maxPrice) {
      match.price = {};

      if (req.query.minPrice) {
        match.price.$gte = parseFloat(req.query.minPrice);
      }

      if (req.query.maxPrice) {
        match.price.$lte = parseFloat(req.query.maxPrice);
      }
    }

    if (req.query.sort) {
      const sorted = await ProductsModel.find().sort({ createdAt: 1 });
      return res.status(200).json({
        success: true,
        message: {
          data: sorted,
        },
      });
    } else if (req.query.unsort) {
      const unSorted = await ProductsModel.find()
        .sort({ createdAt: -1 });
        
      return res.status(200).json({
        success: true,
        message: {
          data: unSorted,
        },
      });
    }

    if (req.query.title) {
      match.title = new RegExp(req.query.title, "i");
    } else if (req.query.category) {
      match.category = new RegExp(req.query.category, "i");
    } else if (req.query.seller) {
      match.seller = new RegExp(req.query.seller, "i");
    } else if (req.query.limitLess) {
      const items = await ProductsModel.find().sort({ createdAt: -1 })
      .populate("category", "title");
      const total = await ProductsModel.countDocuments();
      return res.status(200).json({
        success: true,
        message: {
          data: items,
          count: total,
        },
      });
    }

    ProductData = await ProductsModel.find(match, {
      description: 0,
      reviews: 0,
      ratings: 0,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    const totalProducts = await ProductsModel.countDocuments(match);

    const starting = totalProducts ? skip + 1 : 0;
    const ending = Math.min(starting + limit - 1, totalProducts);

    res.status(200).json({
      success: true,
      message: {
        totalProducts,
        ProductData,
        starting,
        ending,
        page,
      },
    });
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
