import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/src/db/db";
import { authDbAdapter } from "./auth-db-adapter";
import { AUTH_TYPE, SESSION_EXPIRATION_TIME_SECONDS } from "../constants/auth";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing required Google OAuth credentials in environment variables");
}

if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("Missing NEXTAUTH_SECRET env var");
}

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    adapter: authDbAdapter,
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                try {
                    const client = await clientPromise;
                    const users = client.db().collection("Users");
                    
                    const existingUser = await users.findOne({ user_email: user.email });
                    if (existingUser && existingUser.auth_type !== AUTH_TYPE.GOOGLE) {
                        return '/signup?SocialSignupFailed=Google';
                    }
                    
                    return true;
                } catch (error) {
                    console.error("Error in signIn callback:", error);
                    return false;
                }
            }
            return true;
        }
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    session: {
        strategy: "database",
        maxAge: SESSION_EXPIRATION_TIME_SECONDS,
        updateAge: 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
};