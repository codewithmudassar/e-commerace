import { NextResponse } from "next/server";
import { JWTVerify } from "./helpers/jwt";


export async function middleware(req,res) {
   var AccessToken = 
   req.cookies.get("AccessToken")?.value &&
   (await JWTVerify(req.cookies.get("AccessToken")?.value));

   var pathname = req.nextUrl.pathname;
   console.log(pathname)
   var publicRoutes = ["/login"];
    //  console.log(AccessToken)

      var user = await fetch(
           `http://localhost:3000/api/auth/profile?id=${AccessToken}`
         );
    
      user = await user.json();
      user = user.message;
      console.log(user?.isAdmin);
    

  if (!AccessToken && !publicRoutes.includes(pathname)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({
        success: false,
        message: "You are not Authorized!",
      });
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (AccessToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (!AccessToken && pathname === "/admin") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  const restrictedRoutesForUser = [
    "/admin",
    "/admin/order",
  ];

  if (user?.isAdmin === false && restrictedRoutesForUser.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}
    
export const config = {
  matcher: [
    "/login",
    "/admin",
    "/admin/:path*",
  ],
};