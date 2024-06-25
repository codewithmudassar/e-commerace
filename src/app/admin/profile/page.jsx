"use client"
import React , { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
const page = () => {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <div>
       <div className=" grid lg:grid-cols-3 max-w-[1100px] m-auto grid-cols-1">
        <div className="bg-white shadow-md shadow-gray-200 border-dotted lg:col-span-1 rounded-lg px-8 py-8 flex flex-col items-center justify-center h-fit lg:mb-0 mb-5">
          <div className="w-36 h-36 rounded-full">
            <img
              alt="Image Here"
              src={user ? user?.photo :  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2yn3ZsTyoXw7ISC4lViXDaW7uWZRCPAsM-w&s"  }
              className=" rounded-full w-full h-full object-cover profileBoxShadow"
            ></img>
          </div>

          <div className="flex items-center justify-center flex-col my-4">
            <h1
              className={`mb-2 text-2xl font-bold text-slate-600`}
            >
              {user?.fullName}
            </h1>
            <p className="mb-5 px-4 text-xs py-1 bg-indigo-50 text-indigo-400 font-light w-fit rounded-lg">
              {user?.isAdmin ? "Admin" : "User"}
            </p>
            <button className="text-sm bg-indigo-400 text-white px-8 py-1.5 rounded hover:bg-indigo-500">
              Hire Me
            </button>
          </div>
          <div className="mt-4 w-full flex flex-col gap-5">
            <div className=" border rounded-full">
              <span className=" text-slate-500 text-xs block -translate-y-2 px-5 mb-1 bg-white w-fit">
                Username
              </span>
              <h2 className=" px-5 text-sm -translate-y-2 mb-2 text-slate-700">
                {user?.userName}
              </h2>
            </div>
            <div className=" border rounded-full">
              <span className="text-slate-500 text-xs block -translate-y-2 px-5 mb-1 bg-white w-fit">
                Email
              </span>
              <h2 className=" px-5 text-sm -translate-y-2 mb-2 text-slate-700">
                {user?.email}
              </h2>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-lg lg:px-5 px-0">
          {/* Cards Here ------------------------- */}
          <div className="grid grid-cols-2 gap-5">
            {/* Card 01 --------------------------- */}
            <div className="bg-white p-4 rounded-lg shadow-md shadow-gray-200 border-dotted">
              <div className=" flex items-center justify-between">
                <div>
                  <h2 className=" text-slate-700 text-sm">Products</h2>
                  <span className=" text-gray-600 font-semibold text-2xl">
                    23 +
                  </span>
                </div>
                <i className=" bx bxs-package bg-cyan-200 text-cyan-700 p-4 rounded-md"></i>
              </div>
            </div>
            {/* Card 02 --------------------------- */}
            <div className="bg-white p-4 rounded-lg shadow-sm shadow-gray-200 border-dotted">
              <div className=" flex items-center justify-between">
                <div>
                  <h2 className=" text-slate-700 text-sm">Categories</h2>
                  <span className=" text-gray-600 font-semibold text-2xl">
                    12 +
                  </span>
                </div>
                <i className="bx bxs-bar-chart-alt-2 bg-green-200 text-green-700 p-4 rounded-md"></i>
              </div>
            </div>
          </div>
          {/* Bio Section ------------------------ */}
          <div className="bg-white px-5 py-6 rounded-lg my-5 shadow-sm shadow-gray-200 border-dotted">
            <h2 className="text-slate-700 font-semibold mb-2">Bio</h2>
            <p className=" text-slate-500 text-sm leading-[1.5]">
         {user ? user?.bio :
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora,sint perspiciatis eveniet temporibus doloribus iste rerum itaque,odio a fugiat commodi.'
            }
            </p>

          </div>
          <div className="bg-white px-5 py-6 rounded-lg my-5 shadow-sm shadow-gray-200 border-dotted">
            <h2 className="text-slate-700 font-semibold mb-2">About Me</h2>
            <p className=" text-slate-500 text-sm leading-[1.5]">
         {user ? user?.about :
              'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora,sint perspiciatis eveniet temporibus doloribus iste rerum itaque,odio a fugiat commodi.'
            }
            </p>

          </div>

    </div>
    </div>
    </div>
  )
}

export default page
