import bcrypt from "bcrypt";
import { serialize } from "cookie";
import dbConnect from "@/backend/dbConnect";
import { userModel } from "@/backend/models";
import { GenAccessToken } from "@/helpers/jwt";

export default async function Hander(req, res) {
  dbConnect();

  try {
    const { password, userName } = req.body;

    if (!password || !userName) {
      res.status(404).json({
        success: false,
        Message: "Fill All the fields!",
      });
      return;
    }

    const findUserByUserName = await userModel.findOne({ userName });

    const isPasswordValid = await bcrypt.compare(
      password,
      findUserByUserName.password
    );

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Wrong Credentials!",
      });
      return;
    }

    const token = await GenAccessToken({
      userName: findUserByUserName.userName,
      fullName: findUserByUserName.fullName,
      phone: findUserByUserName.phone,
      id: findUserByUserName._id,
    });

    res.setHeader(
      "Set-Cookie",
      serialize("AccessToken", token, {
        path: "/",
        httpOnly: true,
      })
    );

    res.status(200).json({
      success: true,
      Message: "User Login Successfully",
    });
  } catch (error) {
    console.log(error);
  }
}
