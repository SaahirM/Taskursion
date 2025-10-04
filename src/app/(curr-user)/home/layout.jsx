import { SESSION_TOKEN_COOKIE_NAME } from "@/src/constants/auth";
import { authenticateSession } from "@/src/util/session-mgmt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomeLayout({ children }) {
    const sessionId = (await cookies()).get(SESSION_TOKEN_COOKIE_NAME)?.value;
    if (!sessionId || !(await authenticateSession(sessionId))) {
        redirect("/_bad-session-token");   // middleware will delete cookie
    }

    return <>{children}</>;
}