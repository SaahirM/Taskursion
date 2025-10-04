import clientPromise from "@/src/db/db";
import { startSession, getSessionAndUser, endSession, updateSession } from "@/src/util/session-mgmt";
import { ObjectId } from "mongodb";

export const authDbAdapter = {
    async createUser(user) {
        const client = await clientPromise;
        const users = client.db().collection("Users");
        
        const result = await users.insertOne({
            user_name: user.name,
            user_email: user.email,
            user_pass_hash: null,
            user_root_task_ids: [],
            user_last_created_task: 0,
            user_image: user.image,
            auth_type: null,  // set later at linkAccount() below
        });
        
        return {
            id: result.insertedId.toString(),
            name: user.name,
            email: user.email,
            image: user.image
        };
    },

    async getUser(id) {
        const client = await clientPromise;
        const users = client.db().collection("Users");
        
        const user = await users.findOne({ _id: new ObjectId(id) });
        if (!user) return null;
        
        return {
            id: user._id.toString(),
            name: user.user_name,
            email: user.user_email,
            image: user.user_image
        };
    },

    async getUserByEmail(email) {
        const client = await clientPromise;
        const users = client.db().collection("Users");
        
        const user = await users.findOne({ user_email: email });
        if (!user) return null;
        
        return {
            id: user._id.toString(),
            name: user.user_name,
            email: user.user_email,
            image: user.user_image
        };
    },

    async getUserByAccount({ providerAccountId, provider }) {
        const client = await clientPromise;
        const users = client.db().collection("Users");
        
        const user = await users.findOne({ 
            google_id: providerAccountId,
            auth_type: provider
        });
        if (!user) return null;
        
        return {
            id: user._id.toString(),
            name: user.user_name,
            email: user.user_email,
            image: user.user_image
        };
    },

    async updateUser(user) {
        const client = await clientPromise;
        const users = client.db().collection("Users");
        
        await users.updateOne(
            { _id: new ObjectId(user.id) },
            { 
                $set: { 
                    user_name: user.name,
                    user_email: user.email,
                    user_image: user.image
                }
            }
        );
        
        return user;
    },

    async linkAccount(account) {
        const client = await clientPromise;
        const users = client.db().collection("Users");
        
        await users.updateOne(
            { _id: new ObjectId(account.userId) },
            { 
                $set: { 
                    auth_type: account.provider,
                    google_id: account.providerAccountId
                }
            }
        );

        return account;
    },

    async unlinkAccount({ _provider, providerAccountId }) {
        const client = await clientPromise;
        const users = client.db().collection("Users");
        
        await users.updateOne(
            { google_id: providerAccountId },
            { 
                $unset: { 
                    auth_type: "",
                    google_id: ""
                }
            }
        );
        
        return true;
    },

    async createSession({ userId, expires }) {
        const sessionId = await startSession(new ObjectId(userId));
        
        return {
            sessionToken: sessionId,
            userId: userId,
            expires: expires
        };
    },

    async getSessionAndUser(sessionToken) {
        const { session, user } = await getSessionAndUser(sessionToken);
        if (!session || !user) return { session: null, user: null };
        
        return { session, user };
    },

    async updateSession({ sessionToken }) {
        return await updateSession(sessionToken);
    },

    async deleteSession(sessionToken) {
        return await endSession(sessionToken);
    }
};