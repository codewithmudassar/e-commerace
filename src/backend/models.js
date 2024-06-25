import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: String,
  },
  { timestamps: true }
);
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    about: {
      type: String,
    },
    bio: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
      required: [true, "Is Admin Field is Required!"],
    },
    photo: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const productsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },

    stock: {
      type: Number,
      default: 0,
      required: true,
    },
    price: Number,
    images: Array,
    seo: {
      metaTitle: String,
      metaDesc: String,
      metaTags: [String],
    },
  },
  { timestamps: true }
);

const CategoryModel =
  mongoose.models?.categories || mongoose.model("categories", categorySchema);
const ProductsModel =
  mongoose.models?.products || mongoose.model("products", productsSchema);
const userModel = mongoose.models?.users || mongoose.model("users", userSchema);

export { CategoryModel, ProductsModel, userModel };
