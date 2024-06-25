import { CategoryModel } from "@/backend/models";

export default async function handler(req, res) {
  try {
    const get = await CategoryModel.findByIdAndDelete(req.query.id);

    if (!get) {
      res.status(200).json({
        succcess: false,
        message: "category not found",
      });
    }

    res.status(200).json({
      succcess: true,
      message: "category deleted",
    });    console.log(error);

  } catch (error) {
  }
}
