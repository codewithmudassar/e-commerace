import dbConnect from "@/backend/dbConnect";
import { userModel } from "@/backend/models";

export default async function handleAddressAddition(req, res) {
  dbConnect();
  try {
    const userId = req.body._id || req.query.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Ensure addressDetails is initialized as an array
    if (!user.addressDetails) {
      user.addressDetails = [];
    }

    // Extract the new address details from the request body
    const { city, addresses } = req.body;

    // Add the new address to the user's addressDetails array
    user.addressDetails.push({ city, addresses });
    await user.save();

    res.status(200).json({
      success: true,
      message: "Address Added Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}
