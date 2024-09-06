"use client";
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { CartContext } from "@/context/CartProvider";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Navbar = () => {

  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, refetch } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const NoOfCartItems = cartItems.length;

  const handleLogout = async () => {
    try {
      const confirmLogout = window.confirm("Are you sure you want to logout?");
      if (!confirmLogout) return;
      const res = await axios.post("/api/auth/logout");
      if (res.data.success) {
        toast.success("User Logout Successfully!");
        window.location.reload();
        router.push("/login")
        refetch();
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <Toaster />

      <nav className="bg-gray-100 bg-opacity-90 border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex  items-center">
          <Image
            src="/logo2.png"
            width={50}
            height={50}
            alt="CA-shop logo"
          />
          <span className=" text-xl font-bold text-orange-500">-Shop</span>
          </div>
          <div className="flex md:order-2">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded={menuOpen ? "true" : "false"}
              className="md:hidden border bg-gray-50 text-gray-500  border-gray-50 rounded-lg px-2 py-1 globalShadow text-lg  me-1"
              onClick={toggleMenu}
            >
              {!menuOpen ? (
                <i className="bx bx-menu w-5 h-4 text-xl text-gray-500"></i>
              ) : (
                <i className="bx bx-x w-5 h-4 text-xl text-gray-500"></i>
              )}
            </button>
            {/* <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i className="bx bx-search w-5 h-5 text-gray-500"></i>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />
            </div> */}
          </div>
          {/* className={`transition-all duration-500 ease-in-out items-center justify-between ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden w-full md:flex md:w-auto md:order-1`} */}
          <div
            className={`transition-all duration-500 ease-in items-center justify-between ${
              menuOpen ? "block" : "hidden"
            } overflow-hidden w-full md:flex md:w-auto md:order-1`}
            id="navbar-search"
          >
            {/* <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i className="bx bx-search w-4 h-4 text-gray-500"></i>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-300 focus:border-orange-300"
                placeholder="Search..."
              />
            </div> */}
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-100">
              <li>
                <Link
                  href="/"
                  className={`block py-2 px-3 text-gray-900 hover:bg-orange-100 rounded md:hover:bg-transparent ${pathname === "/" ? "text-orange-600 font-bold" : ""} md:hover:text-orange-500 md:p-0p active:text-orange-500`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`block py-2 px-3 text-gray-900 hover:bg-orange-100 rounded md:hover:bg-transparent ${pathname === "/about" ? "text-orange-600 font-bold" : ""} md:hover:text-orange-500 md:p-0p active:text-orange-500`}
                  aria-current="page"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/category"
                  className={`block py-2 px-3 text-gray-900 hover:bg-orange-100 rounded md:hover:bg-transparent ${pathname === "/category" ? "text-orange-600 font-bold" : ""} md:hover:text-orange-500 md:p-0p active:text-orange-500`}
                  aria-current="page"
                >
                  Shop
                </Link>
              </li>

              <div>
                {user ? null : (
                  <li>
                    <Link
                      href="/login"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-orange-100 md:hover:bg-transparent md:hover:text-orange-500 md:p-0p focus:text-orange-500"
                    >
                      login
                    </Link>
                  </li>
                )}
              </div>
            </ul>

            {user ? (
              <div className="flex justify-between items-center md:hidden">
                <div className="flex group relative md:hidden items-center gap-2 pr-4 md:border-l  pl-2.5">
                  <img
                    src={user.photo}
                    alt="image here"
                    className="rounded-full h-9 w-9 object-cover cursor-pointer border border-gray-300"
                  />
                  <div className="leading-3">
                    <p className="text-[14px] capitalize font-medium">
                      {user.fullName}
                    </p>
                    <span className="text-[11px] cursor-pointer text-blue-500">
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </div>

                  {/* Profile Model Here --------------------- */}
                  <div
                    className={`globalShadow2 bg-white border border-dotted pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 group-hover:top-[100%] transition-all duration-500 absolute -left-4 top-[130%] overflow-hidden rounded-md h-fit min-w-[100px] z-[1000000]`}
                  >
                    <ul className="px-4 py-5">
                      <li className="flex flex-col gap-2">
                        {user?.isAdmin ? (
                          <Link
                            className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                            href="/admin"
                          >
                            <i className="bx bxs-bar-chart-alt-2"></i> Dashboard
                          </Link>
                        ) : (
                          <Link
                            className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                            href="/admin/product"
                          >
                            <i className="bx bxs-bar-chart-alt-2"></i> Dashboard
                          </Link>
                        )}

                        <Link
                          className="text-xs text-gray-600 my-2 hover:text-blue-600 flex items-center gap-2"
                          href="/admin/product"
                        >
                          <i className="bx bxs-label"></i> Products
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="text-xs text-gray-600 hover:text-blue-700 flex items-center gap-2"
                        >
                          <i className="bx bxs-log-out"></i>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* bx bx-cart */}
                <Link href={"/cart"}>
                  <i className=" bx bx-cart  relative cursor-pointer text-2xl text-gray-600 hover:text-orange-500">
                    {NoOfCartItems <= 0 ? null : (
                      <span className="bg-orange-300 text-[#344352] absolute -top-1 left-2 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {NoOfCartItems}
                      </span>
                    )}
                  </i>
                </Link>
              </div>
            ) : null}
          </div>
          {user ? (
            <div className="  hidden items-center md:block md:order-2">
              <div className="flex gap-4">
                <Link href={"/cart"}>
                  <i className=" bx bx-cart  relative cursor-pointer text-2xl text-gray-600 hover:text-orange-500">
                    {NoOfCartItems <= 0 ? null : (
                      <span className="bg-orange-300 text-[#344352] absolute -top-1 left-2 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {NoOfCartItems}
                      </span>
                    )}
                  </i>
                </Link>

                <div className="flex group relative  items-center gap-2 pr-4 md:border-l  pl-2.5">
                  <img
                    src={user.photo}
                    alt="image here"
                    className="rounded-full h-9 w-9 object-cover cursor-pointer border border-gray-300"
                  />
                  <div className="leading-3">
                    <p className="text-[14px] capitalize font-medium">
                      {user.fullName}
                    </p>
                    <span className="text-[11px] cursor-pointer text-blue-500">
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </div>

                  {/* Profile Model Here --------------------- */}
                  <div
                    className={`shadow-sm shadow-gray-100 bg-white border border-dotted pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 opacity-0 group-hover:top-[100%] transition-all duration-500 absolute -left-4 top-[130%] overflow-hidden rounded-md h-fit min-w-[100px] z-[1000000]`}
                  >
                    <ul className="px-4 py-5">
                      <li className="flex flex-col gap-2">
                        {user?.isAdmin ? (
                          <Link
                            className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                            href="/admin"
                          >
                            <i className="bx bxs-bar-chart-alt-2"></i> Dashboard
                          </Link>
                        ) : (
                          <Link
                            className="text-xs text-gray-600 hover:text-blue-600 flex items-center gap-2"
                            href="/admin/product"
                          >
                            <i className="bx bxs-bar-chart-alt-2"></i> Dashboard
                          </Link>
                        )}

                        <Link
                          className="text-xs text-gray-600 my-2 hover:text-blue-600 flex items-center gap-2"
                          href="/admin/product"
                        >
                          <i className="bx bxs-label"></i> Products
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="text-xs text-gray-600 hover:text-blue-700 flex items-center gap-2"
                        >
                          <i className="bx bxs-log-out"></i>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
