import { userModel } from "@/backend/models";
import { JWTVerify } from "@/helpers/jwt";
import dbConnect from "@/backend/dbConnect";

export default async function handler(req, res) {
  dbConnect();

  try {
    var token = req.cookies.AccessToken || "";
    var id = (await JWTVerify(token)) || req.query.id;
    // var id = JSON.parse(atob(req.cookies.AccessToken.split(".")[1])).id

    const foundUser = await userModel
      .findById(id, { password: false })
      console.log(id)
      // .populate("followers", "fullName photo");

    if (!foundUser) {
      res.status(400).json({
        success: false,
        message: "User Not Found!",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: foundUser,
    });
  } catch (error) {
    if (error.kind == "ObjectId") {
      res.status(400).json({
        success: false,
        message: null,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}