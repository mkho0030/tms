import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const url = request.nextUrl.clone();

  if (url.pathname.startsWith('/api') && process.env.ENFORCE_MIDDLEWARE == 'false'){
    return NextResponse.next();
  }

  if (url.pathname === "/") {
		return NextResponse.redirect(new URL("/tasks", request.url));
	}

	if (url.pathname === "/auth") {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	const verifyTokenPath = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify`;
	const idToken = request.cookies.get("auth_token");

  try{
    const verifyRes =  await fetch(verifyTokenPath, {
      method: "POST",
      body: JSON.stringify({
        idToken: idToken,
      }),
    });

    if (verifyRes.status == 200){
      return NextResponse.next()
    }
    else{
      throw Error()
    }

  }catch(e){
    return NextResponse.json({message: 'Token is unverified, Please relogin'}, {status: 401})  
  }	
}

export const config = {
	matcher: [
    "/", 
    "/auth", 
    "/api/((?!auth).*)"
  ],
};
