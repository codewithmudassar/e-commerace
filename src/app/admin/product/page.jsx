// "use client";
import Link from "next/link";
import ProductTable from "./productTable";

const page = () => {
  return (
    <div>
      <div className=" h-11 w-full bg-gray-50 flex justify-between px-4 items-center">
        <div>
          Manage your product
        </div>
        <div className="flex items-center gap-4">
          <div>Products Add</div>
          <Link
            href="/admin/formProduct"
            className=" h-6 text-center bg-gray-300 active:bg-orange-300 w-7 pl-"
          >
            +
          </Link>
        </div>
      </div>
      <div className="p-3">
        <ProductTable />
      </div>
    </div>
  );
};

export default page;
