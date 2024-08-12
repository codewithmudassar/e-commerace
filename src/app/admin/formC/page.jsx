"use client";
import React, { useState } from "react";
import BackButton from "@/components/backbu";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";

const Page = () => {
  const [formData, setFormData] = useState({ title: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("/api/categories", { ...formData });

      if (res?.data?.success) {
        toast.success("Submitted successfully");
        setTimeout(() => {
          router.back();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }, 1000);
      } else {
        toast.error("Submission failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.Message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster />
      <div className="border rounded-lg mt-5 mb-7 mx-11">
        <BackButton />
        <div className="m-11 text-orange-500 font-extrabold text-3xl text-center">
          Add Category
        </div>
        <form className="mb-4 mx-12" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-xl text-gray-500" htmlFor="name">
              Category Name
            </label>
            <br />
            <input
              id="name"
              type="text"
              name="title"
              placeholder="Name"
              value={formData.title}
              onChange={changeHandler}
              className="pl-3 rounded-md mt-4 w-9/12 h-12 border active:border-orange-200"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-white bg-orange-400"
            >
              {loading ? <Loader /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
