import React from "react";
import Link from "next/link";
import Categorys from "./categorytable";

const page = () => {
  return (
    <div>
      <div className=" h-11 w-full bg-gray-50 flex justify-between px-4 items-center">
        <div>
          {/* <i className="bx bx-left-arrow-alt text-3xl"></i> */}
          Manage categories
        </div>
        <div className="flex items-center gap-4">
          <div>Categories Add</div>
          <Link
            href="/admin/formC"
            className=" h-6 text-center bg-gray-300 active:bg-orange-300 w-7 pl-"
          >
            +
          </Link>
        </div>
      </div>
      <div className="p-3">
        <Categorys />
      </div>
    </div>
  );
};

export default page;
