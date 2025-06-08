import { authenticateSession } from "@/src/util/session-mgmt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomeLayout({ children }) {
    const sessionId = (await cookies()).get("sessionToken")?.value;
    if (!sessionId || !(await authenticateSession(sessionId))) {
        redirect("/_bad-session-token");   // middleware will delete cookie
    }

    return <>{children}</>;
}