import dbConnect from "@/backend/dbConnect";
import users from "@/backend/models";

export default async function handler(req, res) {
  dbConnect();

  try {
    const userId = req.params.userId;
    const addressId = req.params.addressId;

    // Find the user by ID
    const user = await users.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Find the index of the address in the addressDetails array
    const addressIndex = user.addressDetails.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    // Remove the address from the array
    user.addressDetails.splice(addressIndex, 1);

    // Save the updated user
    await user.save();

    res.json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}