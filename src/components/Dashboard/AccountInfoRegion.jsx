import { cookies } from "next/headers";
import AccountInfo from "./AccountInfo";
import { getSessionUser } from "@/src/util/session-mgmt";
import { redirect } from "next/navigation";
import clientPromise from "@/src/db/db";
import { ObjectId } from "mongodb";

export default async function AccountInfoRegion() {
    const sessionId = (await cookies()).get("sessionToken")?.value;
    const usernamePromise = getSessionUser(sessionId)
        .then(async userId => {
            if (!userId) {
                redirect("/_bad-session-token");    // middleware will delete cookie
            }

            const client = await clientPromise;
            const users = client.db().collection("Users");
            const user = await users.findOne({ _id: new ObjectId(userId) });
            return user.user_name;
        });

    return (<AccountInfo usernamePromise={usernamePromise} />);
}