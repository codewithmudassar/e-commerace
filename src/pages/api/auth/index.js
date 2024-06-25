import { userModel } from "@/backend/models";
import dbConnect from "@/backend/dbConnect";
import bcrypt from "bcrypt";

export default async function Hander(req, res) {
  dbConnect();

  switch (req.method) {
    case "GET":
      try {
        var users = await userModel.find({}, { email: false });
        res.status(200).send({
          success: true,
           users,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
      break;

    case "POST":
      try {
        const { fullName, userName, password } = req.body;
        if (!fullName || !userName) {
          res.status(404).json({
            success: false,
            Message: "Fill All the fields!",
          });
          return;
        }

        const hasedPassword = await bcrypt.hash(password, 10);

        const addNewUser = await userModel.create({
          ...req.body,
          password: hasedPassword,
        });

        res.status(201).json({
          success: true,
          Message: addNewUser,
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
