import React from "react";

async function getData() {
  try {
    const res = await fetch("http://localhost:3000/api/categories");
    const resjson = await res.json();
    console.log(resjson);
    return resjson;
  } catch (error) {
    console.log(error);
  }
}

async function CategorySelect() {
    
  const data = await getData();

  return (
    <div>
      <select
        id="category"
        className="bg-white pl-2  text-black capitalize  w-9/12 h-12 rounded-md font-bold"
      >
        <option selected="" className="ml-2">
          Select category
        </option>
        {data?.message?.map((v, i) => {
          return (
            <>
              <option key={i} value={v?._id}>
                {v?.title}
              </option>
            </>
          );
        })}
      </select>
    </div>
  );
}

export default CategorySelect;
