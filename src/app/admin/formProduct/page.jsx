"use client";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/backbu";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import { CldUploadWidget } from "next-cloudinary";

const page = () => {
  const [options, setOption] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    stock: "",
    price: "",
    category: "",
    desc: "",
  });
  const [loading, setLoading] = useState(false);
  const [tempImages, setTempImages] = useState([]);

  const router = useRouter();

  // Getting categories
  async function getData() {
    try {
      const res = await fetch("http://localhost:3000/api/categories");
      const resjson = await res.json();
      setOption(resjson.message);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // Change handler
  function changeHandler(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await axios.post("/api/products", {
        ...formData,
        images: tempImages,
      });

      if (res?.data?.success) {
        toast.success("Submitted");
        setTimeout(() => {
          router.back();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }, 1000);
      }
    } catch (error) {
      console.log(error?.response?.data);
      if (error?.response?.data?.success == false) {
        toast.error("Error happened");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster />

      <div className="border rounded-lg bg-gray-200 mt-5 mb-7 p-4">
        <BackButton />
        <div className="text-orange-500 font-extrabold text-3xl text-center mb-5">
          Add Product
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-xl text-gray-500" htmlFor="name">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              name="title"
              placeholder="name"
              onChange={changeHandler}
              className="mt-2 p-2 w-full rounded-md border active:border-orange-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl text-gray-500" htmlFor="stock">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              name="stock"
              placeholder="Stock"
              onChange={changeHandler}
              className="mt-2 p-2 w-full rounded-md border active:border-orange-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl text-gray-500" htmlFor="category">
              Category
            </label>
            <select
              className="mt-2 p-2 w-full rounded-md border active:border-orange-200"
              onChange={changeHandler}
              name="category"
            >
              <option value="" className="ml-2">
                Select category
              </option>
              {options?.map((v, i) => (
                <option key={i} value={v._id}>
                  {v.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-xl text-gray-500" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              type="number"
              name="price"
              placeholder="price"
              onChange={changeHandler}
              className="mt-2 p-2 w-full rounded-md border active:border-orange-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-xl text-gray-500" htmlFor="desc">
              desc
            </label>
            <textarea
              id="desc"
              type="text"
              name="desc"
              placeholder="desc"
              onChange={changeHandler}
              className="mt-2 p-2 w-full rounded-md border active:border-orange-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl text-gray-500" htmlFor="images">
              Images
            </label>
            <div className="mt-2">
              <CldUploadWidget
                uploadPreset="e-commerace-app"
                onSuccess={(results) => {
                  if (results.info?.secure_url && results.event === "success") {
                    setTempImages((prevImages) => [...prevImages, results.info.secure_url]);
                  }
                }}
                options={{ multiple: true }}
              >
                {({ open }) => {
                  return (
                    <button className="font-bold p-2 bg-blue-500 text-white rounded-md" type="button" onClick={open}>
                      Upload Images
                    </button>
                  );
                }}
              </CldUploadWidget>
            </div>
          </div>

          {tempImages.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {tempImages.map((img, index) => (
                <div key={index} className="relative w-[160px] h-[160px]">
                  <img src={img} alt={`Uploaded ${index}`} className="w-full h-full object-cover rounded-lg" />
                  <button
                    onClick={() => setTempImages((prevImages) => prevImages.filter((_, i) => i !== index))}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* <div className="mb-4">
            <label className="block text-xl text-gray-500" htmlFor="desc">
              Description
            </label>
            <Editor
              apiKey="oy0ykjree9ump5qchvx8gx0ujvyu90n28iajn9oi1xjpj12q"
              value={formData.desc}
              onEditorChange={(content) => {
                setFormData({
                  ...formData,
                  desc: content,
                });
              }}
              init={{
                height: 300,
                width: '100%',
                placeholder: "Write about your product",
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                tinycomments_mode: "embedded",
                tinycomments_author: "Author name",
              }}
            />
          </div> */}

          <div className="mb-4">
            <button className="mt-2 p-2 w-full rounded-md border font-bold uppercase text-white bg-orange-600 active:text-white">
              {loading ? <Loader /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
