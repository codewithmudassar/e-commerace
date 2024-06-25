"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import BackButton from "./backbu";
import React, { useContext } from "react";



const Dnav = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (!confirmLogout) return;
      const res = await axios.post("/api/auth/logout");
      if (res.data.success) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <div className="bg-[#ffffffbe] backdrop-blur-lg z-[99] sticky top-0">
        <div className="flex items-center justify-between py-3 px-8">
          <div className="flex items-center gap-4">
            <BackButton/>
            {/* <div className="rounded-full flex items-center justify-center h-8 w-8 hover:bg-gray-100 cursor-pointer">
              <i className="fa-solid fa-search text-gray-400 rounded-full"></i>
            </div> */}
          </div>
          {/* PROFILE START ============================*/}
          <>
            {user ? (
              <div className="flex py-2 group relative items-center gap-2 pr-4">
                {/* <ul className="flex items-center gap-5">
                  <li className="svgAnim">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.408 0-1.779.152a2.008 2.008 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.615 1.615 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.026 2.026 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361c0 .558-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a1.99 1.99 0 0 0-.399 1.479c.053.394.287.798.757 1.605c.47.807.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2.008 2.008 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a1.99 1.99 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361c0-.558.306-1.064.782-1.36c.324-.203.533-.364.682-.556a1.99 1.99 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605c-.47-.807-.704-1.21-1.022-1.453a2.026 2.026 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.615 1.615 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2.007 2.007 0 0 0-1.09-1.083"
                        clipRule="evenodd"
                        opacity={0.5}
                      ></path>
                      <path
                        fill="currentColor"
                        d="M15.523 12c0 1.657-1.354 3-3.023 3c-1.67 0-3.023-1.343-3.023-3S10.83 9 12.5 9c1.67 0 3.023 1.343 3.023 3"
                      ></path>
                    </svg>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                    >
                      <circle cx={12} cy={6} r={4} fill="currentColor"></circle>
                      <path
                        fill="currentColor"
                        d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
                        opacity={0.5}
                      ></path>
                    </svg>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M18.75 9v.704c0 .845.24 1.671.692 2.374l1.108 1.723c1.011 1.574.239 3.713-1.52 4.21a25.794 25.794 0 0 1-14.06 0c-1.759-.497-2.531-2.636-1.52-4.21l1.108-1.723a4.393 4.393 0 0 0 .693-2.374V9c0-3.866 3.022-7 6.749-7s6.75 3.134 6.75 7"
                        opacity={0.5}
                      ></path>
                      <path
                        fill="currentColor"
                        d="M7.243 18.545a5.002 5.002 0 0 0 9.513 0c-3.145.59-6.367.59-9.513 0"
                      ></path>
                    </svg>
                  </li>
                </ul> */}
                <img
                  alt="image here"
                  src={user.photo || "/user.jpeg"}
                  className="rounded-full h-9 w-9 object-cover cursor-pointer border border-gray-300"
                />
                <div className="leading-3">
                  <p className="text-[14px] capitalize font-medium">
                    {user.fullName}
                  </p>
                  <span className="text-[11px] cursor-pointer text-red-500 hover:text-red-600">
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </div>

                {/* Profile Model Here */}
                <div
                  className={`shade pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 group-hover:top-[100%] transition-all duration-500 bg-[#fafafb] border absolute right-4 top-[130%] overflow-hidden rounded-md h-fit min-w-[100px] z-[999]`}
                >
                  <ul className="px-4 py-5">
                    <li className="flex flex-col gap-2">
                      <Link
                        className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                        href="/admin/profile"
                      >
                        <i className="bx bxs-user"></i> Profile
                      </Link>
                      <Link
                        className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                        href="/admin/profile/edit"
                      >
                        <i className="bx bxs-cog"></i> Setting
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                      >
                        <i className="bx bxs-log-out"></i>{" "}
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex py-2 group relative items-center gap-2 pr-4">
                <img
                  src="/user.jpeg"
                  alt="image here"
                  className="rounded-full h-9 w-9 object-cover cursor-pointer border border-gray-300"
                />
                <div className="leading-3">
                  <p className="text-[14px] capitalize font-medium">
                    Not Found
                  </p>
                  <span className="text-[11px] cursor-pointer text-red-500 hover:text-red-600">
                    User
                  </span>
                </div>

                {/* Profile Model Here  */}
                <div
                  className={`shade pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 group-hover:top-[100%] transition-all duration-500 bg-white absolute left-0 top-[130%] overflow-hidden rounded-md h-fit min-w-[100px] z-[1000000]`}
                >
                  <ul className="px-4 py-4">
                    <li className="flex flex-col gap-2">
                      <Link
                        className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                        href="/admin/profile"
                      >
                        <i className="bx bxs-user"></i> Profile
                      </Link>
                      <Link
                        className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                        href="/"
                      >
                        <i className="bx bxs-cog"></i> Setting
                      </Link>
                      <button className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2">
                        <i className="bx bxs-log-out"></i> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default Dnav;