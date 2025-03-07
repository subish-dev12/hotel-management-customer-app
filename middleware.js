//this middleware file should be created at the root level
// the level same as the .env , jsconfig, next.config etc
// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log("request ko barem hai ", request);

//   return NextResponse.redirect(new URL("/about", request.url));
// }
//since middleware runs after every request so next js will redirect user to the about
//page every time so we get error: localhost redirected you too many times.
// that's why we need to define for which route to run the middleware
//matcher

import { auth } from "./app/_lib/auth";
//the auth function that's exported from nextauth can also be used as middleware.
//we renamed here auth as middleware
export const middleware = auth;

export const config = {
  matcher: ["/account"], //now the middleware only runs for account route, can add as many routes as we want
};
