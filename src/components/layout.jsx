"use client";
import React from "react";
import Navbar from "./navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Dnav from "./Dnav";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  var Pathname = usePathname();
  return (
      <div>
        {Pathname.startsWith("/admin") ? (
          <div className=" flex h-screen">
            <div className="">
              <Sidebar />
            </div>
            <div className=" shadow-inner  shadow-black flex-1 overflow-auto">
              <Dnav/>
              {children}
            </div>
          </div>
        ) : (
          <div>
            <div className="">
              <Navbar />
            </div>
            <div>{children}</div>
            <div className="sticky bottom-0">
              <Footer />
            </div>
          </div>
        )}
      </div>
  );
};

export default Layout;
