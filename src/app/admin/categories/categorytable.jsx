import React from "react";
import Deletebutton from "@/components/Deleteca";

const Categorys = async () => {
  async function getData() {
    const res = await fetch("http://localhost:3000/api/categories", {
      cache: "no-store",
    });

    return res.json();
  }

  const data = await getData();

  // console.log(data?.message);
  return (
    <div id="dropdown">
      <div className=" bg-center max-w-32 m-auto uppercase  bg-orange-500  p-1 font-bold   rounded-lg shadow shadow-orange-500  text-center">
        Category
      </div>

      <div className="border p-7 bg-orange-50 rounded-xl  m-1 grid sm:grid-cols-1 lg:grid-cols-2  md:grid-cols-1 gap-4  w-full  ">
        {data?.message.map((v, i) => {
          return (
            <div className=" capitalize flex  justify-between   font-bold border  rounded-xl bg-gradient-to-r from-orange-400  shadow-md shadow-orange-500 duration-500 p-2">
              {v.title}
              <div>
                <Deletebutton id={v._id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categorys;
