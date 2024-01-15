import { NextResponse } from "next/server"

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Also, ignore prefetches
         * 
         * This code was adapted from
         * https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
         * at 14-Jan-2024
         */
        {
            source: '/((?!_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ]
        }
    ]
}

export async function middleware(req) {
    if (
        req.nextUrl.pathname.startsWith("/signup") ||
        req.nextUrl.pathname.startsWith("/login") ||
        req.nextUrl.pathname === "/"
    ) {
        if (req.cookies.has("sessionToken")) {
            return NextResponse.redirect(new URL("/home", req.url));
        }

    } else if (
        req.nextUrl.pathname.startsWith("/api/user/signup") ||
        req.nextUrl.pathname.startsWith("/api/user/login")
    ) {
        if (req.cookies.has("sessionToken")) {
            return new Response("You are already logged in.", { status: 400 });
        }

    } else {
        if (!req.cookies.has("sessionToken")) {
            if (req.nextUrl.pathname.startsWith("/api")) {    
                return new Response("Please login using /api/user/login first.", { status: 401 });
            } else {
                return NextResponse.redirect(new URL("/login?notLoggedIn", req.url));
            }
        }

        const sessionToken = req.cookies.get("sessionToken").value;
        const fetchRes = await fetch("/api/user/auth", { method: 'POST', body: sessionToken });
        // TODO verify if token is legit
    }
}