import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/create-account": true,
  "/manifest": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/todo", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|icons|favicon.ico|manifest).*)"],
};
