"use client"
import React, { useState } from "react";
import BackButton from "@/components/backbu";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";

const page = () => {
  const [formData, setFormData] = useState({
    title: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("/api/categories", { ...formData });

      if (res?.data?.success) {
        toast.success("Summbmited");
        setTimeout(() => {
          router.back();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }, 1000);
      }
    } catch (error) {
      if (error?.response?.data?.success === false) {
        toast.error(error?.response?.data?.Message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="border rounded-lg mt-5 mb-7 ml-11 mr-11">
        <BackButton />
        <div className="m-11 text-orange-500 font-extrabold box-border text-3xl text-center">
          Add Categories
        </div>
        <form className="mb-4 ml-12" onSubmit={handleSubmit}>
          <div className="ml-11 ">
            <label className="text-xl text-gray-500" htmlFor="name">
              Product Name
            </label>
            <br />
            <input
              required="true"
              id="name"
              type="text"
              name={"title"}
              placeholder="name"
              value={formData.title}
              onChange={changeHandler}
              className=" pl-3 rounded-md mt-4 w-9/12 h-12 border active:border-orange-200"
            />
          </div>

          <div className="ml-11 mt-7 w-fit px-4 py-1 rounded-md text-white  bg-orange-400">
            <button>{loading ? <Loader /> : "Submit"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
