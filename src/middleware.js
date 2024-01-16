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
        req.nextUrl.pathname === "/signup" ||
        req.nextUrl.pathname === "/login" ||
        req.nextUrl.pathname === "/"
    ) {
        if (req.cookies.has("sessionToken")) {
            return NextResponse.redirect(new URL("/home", req.url));
        }

    } else if (
        req.nextUrl.pathname === "/api/user/signup" ||
        req.nextUrl.pathname === "/api/user/login"
    ) {
        if (req.cookies.has("sessionToken")) {
            return new NextResponse("You are already logged in.", { status: 400 });
        }

    } else if (req.nextUrl.pathname.startsWith("/api") && req.nextUrl.pathname !== "/api/user/auth") {
        if (!req.cookies.has("sessionToken")) {
            return new NextResponse(
                "Please login at /login or using /api/user/login first.", { status: 401 }
            );
        }

        const sessionToken = req.cookies.get("sessionToken").value;
        const fetchRes = await fetch(
            new URL("/api/user/auth", req.url),
            { method: 'POST', body: sessionToken }
        );

        if (!fetchRes.ok) {
            return new NextResponse("The server cannot authenticate this request.", { status: 500 });
        }
        
        const authRes = await fetchRes.text();
        if (authRes === "0") {
            return new NextResponse(
                "Please login at /login or using /api/user/login first.", { status: 401 }
            );
        }

    }  else if (req.nextUrl.pathname.startsWith("/home")) {
        if (!req.cookies.has("sessionToken")) {
            const newPath = encodeURI(req.nextUrl.pathname);
            return NextResponse.redirect(new URL(`/login?notLoggedIn&afterLogin=${newPath}`, req.url));
        }

        const sessionToken = req.cookies.get("sessionToken").value;
        const fetchRes = await fetch(
            new URL("/api/user/auth", req.url),
            { method: 'POST', body: sessionToken }
        );

        if (!fetchRes.ok) {
            return NextResponse.redirect(new URL("/login?serverAuthError", req.url));
        }

        const authRes = await fetchRes.text();
        if (authRes === "0") {
            return NextResponse.redirect(new URL(`/login?notLoggedIn&afterLogin=${newPath}`, req.url));
        }
    }
}