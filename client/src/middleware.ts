import jwtDecode from "jwt-decode";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { IUser } from "types/User";
import { ADMIN_URL, LOGIN_URL } from "utils/consts";
import { authRoutes } from "utils/routes";

export function middleware(request: NextRequest) {
  const authToken: IUser | undefined = request.cookies.get("token")
    ? jwtDecode(request.cookies.get("token")?.value as string)
    : undefined;

  if (authToken) {
    if (authToken?.role !== "ADMIN" && request.nextUrl.pathname.startsWith(ADMIN_URL)) {
      return NextResponse.redirect(new URL("/protected", request.url));
    }
  } else {
    if (
      authRoutes.some((route) => route === request.nextUrl.pathname) ||
      request.nextUrl.pathname.startsWith(ADMIN_URL)
    ) {
      return NextResponse.redirect(new URL(LOGIN_URL, request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
