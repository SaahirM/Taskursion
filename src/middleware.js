import { NextResponse } from "next/server";

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Also, ignore prefetches
         * 
         * This code was taken at 20-Feb-2024 from
         * https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
         */
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' }
            ]
        }
    ]
};

const unprotectedPages = new Set(["", "/", "/signup", "/login"]);

export function middleware(req) {
    let res = NextResponse.next();

    if ((unprotectedPages.has(req.nextUrl.pathname)) && (req.cookies.has("sessionToken"))) {
        res = NextResponse.redirect(new URL("/home", req.url));

    } else if ((req.nextUrl.pathname.startsWith("/home")) && (!req.cookies.has("sessionToken"))) {
        const newPath = encodeURIComponent(req.nextUrl.pathname);
        res = NextResponse.redirect(new URL(`/login?notLoggedIn&afterLogin=${newPath}`, req.url));

    } else if (req.nextUrl.pathname === "/_bad-session-token") {
        const expireTokenRes = NextResponse.redirect(new URL("/login?notLoggedIn", req.url));
        expireTokenRes.cookies.delete("sessionToken");
        return expireTokenRes;
    }

    if (req.cookies.has("next-auth.session-token")) {
        const sessionToken = req.cookies.get("next-auth.session-token").value;

        if (req.cookies.get("sessionToken")?.value !== sessionToken) {    
            res.cookies.set("sessionToken", sessionToken);
        }
    }

    return res;
}