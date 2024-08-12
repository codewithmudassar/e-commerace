"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import InputMask from "react-input-mask";
import { Toaster, toast } from "react-hot-toast";
import React, { useContext, useState } from "react";
import { CartContext } from "@/context/CartProvider";
import { AuthContext } from "@/context/AuthContext";
import AddressForm from "@/components/AddressForm"; // Create this component
import OrderSummary from "@/components/OrderSummary"; // Create this component

const Index = () => {
  const router = useRouter();
  const { user, refetch } = useContext(AuthContext);
  const { cartItems, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    city: "",
    address: "",
  });
  const [addressFormData, setAddressFormData] = useState({
    city: "",
    addresses: "",
  });

  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = typeof item.price === "string"
      ? parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
      : item.price;
    return total + itemPrice * item.quantity;
  }, 0);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressFormData({ ...addressFormData, [name]: value });
  };

  const handleAddressSelection = (e) => {
    setSelectedAddress(e.target.value);
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!user && Object.values(formData).some(field => !field)) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (user && !selectedAddress) {
      toast.error("Please select a shipping address.");
      return;
    }

    try {
      setLoading(true);
      const orderData = {
        items: cartItems.map(v => ({
          productID: v._id,
          unitPrice: v.price,
          quantity: v.quantity,
        })),
        ...(user ? {
          hasLoginUserData: user._id,
          isLoginUserAddress: selectedAddress,
        } : {
          customerDetail: formData,
        }),
      };

      const res = await axios.post("/api/orders", orderData);
      if (res.data.success) {
        toast.success("Order Placed Successfully!");
        router.push("/");
        clearCart();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const userSubmitAddressData = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.put(`/api/auth/add-address/?id=${user._id}`, addressFormData);
      if (res.data.success) {
        toast.success("Address added successfully!");
        setAddressFormData({ city: "", addresses: "" });
        setShowForm(false);
        refetch(); // Use refetch to update address list
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add address.");
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await axios.delete(`/api/auth/delete-address?userId=${user._id}&addressId=${addressId}`);
        toast.success("Address deleted successfully");
        refetch(); // Use refetch to update address list
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete address.");
      }
    }
  };

  return (
    <>
      <Toaster />
      <AddressForm
        showForm={showForm}
        setShowForm={setShowForm}
        addressFormData={addressFormData}
        handleAddressChange={handleAddressChange}
        userSubmitAddressData={userSubmitAddressData}
        loading={loading}
      />

      <div className="px-4 my-12">
        <form onSubmit={placeOrder} className="globalShadow bg-white max-w-[1200px] m-auto grid gap-6 grid-cols-5 py-10 rounded-lg p-4">
          {user ? (
            <div className="p-2 col-span-3">
              <h2 className="text-xl font-semibold mb-5">Shipping information</h2>
              <div onClick={() => setShowForm(true)} className="flex items-center gap-2 p-2 rounded-lg bg-blue-100 cursor-pointer hover:bg-blue-200 transition">
                <i className="bx bx-plus text-center text-xl rounded-full h-6 w-6 flex items-center justify-center bg-blue-500 text-white transition-all duration-150"></i>
                <span className="text-blue-500">Add New Address</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {user.addressDetails.map((item, index) => (
                  <div key={index}>
                    <label className="flex p-3 border border-gray-200 rounded-md bg-gray-50 hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
                      <input
                        name="shipping"
                        type="radio"
                        className="h-4 w-4 mt-1"
                        value={`${item.city} ${item.addresses}`}
                        checked={selectedAddress === `${item.city} ${item.addresses}`}
                        onChange={handleAddressSelection}
                      />
                      <p className="ml-2">
                        <span>City</span>
                        <div className="block text-sm text-gray-400">{item.city}</div>
                        <span>Address</span>
                        <div className="block text-sm text-gray-400">{item.addresses}</div>
                      </p>
                      <button onClick={() => deleteAddress(item._id)}>Delete Address</button>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 col-span-5 lg:col-span-3 p-2">
              <h2 className="col-span-2 font-semibold text-2xl">Shipping Details</h2>
              {/* Form Fields */}
              {/* Full Name, Phone Number, Email, City, Street Address */}
              {/* Add these form fields as shown in your original code */}
            </div>
          )}
          <OrderSummary
            cartItems={cartItems}
            totalPrice={totalPrice}
            loading={loading}
          />
        </form>
      </div>
    </>
  );
};

export default Index;
