"use client";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const router = useRouter();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Login successful: ", response.data);
      toast.success("User Logged In");
      // Redirect to home page or dashboard
      router.push("/dashboard"); // Change to the desired path
    } catch (error) {
      console.error("Login error: ", error);
      const errorMessage =
        error?.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-11">
      <Toaster />
      <form
        className="max-w-sm mx-auto mt-11 p-11 bg-gray-100 rounded-md"
        onSubmit={submitForm}
      >
        <div>
          <h2 className="text-center font-extrabold text-2xl mb-5">Login</h2>
        </div>
        <div className="mb-5">
          <label
            htmlFor="userName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            User Name
          </label>
          <input
            value={formData.userName}
            onChange={changeHandler}
            type="text"
            name="userName"
            id="userName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="username"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            value={formData.password}
            onChange={changeHandler}
            placeholder="password"
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {loading ? "Processing..." : "Log In"}
        </button>
      </form>
      <p className="mt-8 text-center text-sm text-gray-500">
  Don&apos;t Have an Account?&nbsp;
  <Link
    href="/register"
    className="leading-6 text-orange-500 hover:text-orange-600"
  >
    Sign up
  </Link>
</p>

    </div>
  );
};

export default Page;
