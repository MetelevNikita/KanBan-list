import { NextResponse } from "next/server";
import type  { NextRequest } from "next/server";


export const middleware = (request: NextRequest) => {

  const publickPaths = ["/login"]
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";


  if (token && (path === "/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }


  if(publickPaths.includes(path)) {
    return NextResponse.next();
  }


  if(!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }



  if(path !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }


  return NextResponse.next()
}




export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|static|.*\\.(?:css|js|ico|png|jpg|jpeg|gif|svg)$).*)',
  ],
};