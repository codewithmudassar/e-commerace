import React from "react";

const Loader = () => {
  return (
    <div className=" bg-[#00000090] h-screen w-screen grid place-content-center absolute top-0 left-0">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
