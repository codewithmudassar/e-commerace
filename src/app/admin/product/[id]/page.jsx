"use client";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/backbu";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import { CldUploadWidget } from "next-cloudinary";

const Page = ({ params }) => {
  const productID = params?.id;
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    stock: "",
    price: "",
    category: "",
    desc: "",
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [tempImages, setTempImages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("/api/categories");
        const resJson = await res.json();
        setOptions(resJson.message);
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    }

    async function getSingleProduct() {
      try {
        const res = await fetch(`/api/products/${productID}`);
        const resJson = await res.json();
        setFormData(resJson.getSingle);
        setTempImages(resJson.getSingle.images || []);
      } catch (error) {
        toast.error("Failed to fetch product details");
      } finally {
        setInitialLoading(false);
      }
    }

    getData();
    getSingleProduct();
  }, [productID]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(`/api/products/${productID}`, {
        ...formData,
        images: tempImages,
      });

      if (res.status === 200) {
        toast.success("Product updated successfully");
        setTimeout(() => {
          router.back();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }, 1000);
      }
    } catch (error) {
      toast.error("An error occurred while updating the product");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <div className="border rounded-lg bg-gray-200 mt-5 mb-7 p-6">
        <BackButton />
        <div className="text-orange-500 font-extrabold text-3xl text-center mb-8">
          Edit Product
        </div>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Product Name"
            id="name"
            type="text"
            name="title"
            value={formData.title}
            onChange={changeHandler}
          />
          <InputField
            label="Stock"
            id="stock"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={changeHandler}
          />
          <CategorySelect
            options={options}
            value={formData.category}
            onChange={changeHandler}
          />
          <InputField
            label="Price"
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={changeHandler}
          />
          <ImageUpload
            images={tempImages}
            setImages={setTempImages}
          />
          <div className="mt-7">
            <label className="text-xl text-gray-500" htmlFor="desc">
              Description
            </label>
            <br />
            <Editor
              apiKey="oy0ykjree9ump5qchvx8gx0ujvyu90n28iajn9oi1xjpj12q"
              value={formData.desc}
              onEditorChange={(content) => setFormData({ ...formData, desc: content })}
              init={{
                height: 300,
                width: "100%",
                placeholder: "Write about your product",
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                tinycomments_mode: "embedded",
                tinycomments_author: "Author name",
              }}
            />
          </div>
          <div className="mt-7">
            <button
              className="rounded-md w-full h-12 border font-bold uppercase text-white bg-orange-600 active:text-white"
              type="submit"
            >
              {loading ? <Loader /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, id, type, name, value, onChange }) => (
  <div className="mb-4">
    <label className="text-xl text-gray-500" htmlFor={id}>
      {label}
    </label>
    <br />
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="pl-3 rounded-md mt-4 w-full h-12 border active:border-orange-200"
    />
  </div>
);

const CategorySelect = ({ options, value, onChange }) => (
  <div className="mb-4">
    <label className="text-xl text-gray-500" htmlFor="category">
      Category
    </label>
    <br />
    <select
      className="pl-3 rounded-md mt-4 w-full h-12 border capitalize active:border-orange-200"
      name="category"
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>
        Select category
      </option>
      {options.map((option, i) => (
        <option key={i} value={option._id}>
          {option.title}
        </option>
      ))}
    </select>
  </div>
);

const ImageUpload = ({ images, setImages }) => (
  <div className="mb-4">
    <label className="text-xl text-gray-500" htmlFor="images">
      Images
    </label>
    <br />
    <div className="border border-blue-400 rounded-lg shadow-md shadow-gray-400 bg-blue-500 w-fit mt-4 p-3">
      <CldUploadWidget
        uploadPreset="e-commerace-app"
        onSuccess={(results) => {
          if (results.info?.secure_url && results.event === "success") {
            setImages((prevImages) => [...prevImages, results.info.secure_url]);
          }
        }}
        options={{ multiple: true }}
      >
        {({ open }) => (
          <button className="font-bold" type="button" onClick={open}>
            Upload Images
          </button>
        )}
      </CldUploadWidget>
    </div>
    {images.length > 0 && (
      <div className="flex flex-wrap gap-4 mt-4">
        {images.map((img, index) => (
          <div key={index} className="relative w-[160px] h-[160px]">
            <img src={img} alt={`Uploaded ${index}`} className="w-full h-full object-cover rounded-lg" />
            <button
              onClick={() => setImages((prevImages) => prevImages.filter((_, i) => i !== index))}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Page;
