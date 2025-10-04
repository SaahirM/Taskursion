import clientPromise from "../db/db";
import { SESSION_EXPIRATION_TIME_MS } from "../constants/auth";

export async function startSession(userId, expires = null) {
    const client = await clientPromise;
    const sessions = client.db().collection("Sessions");
    const sessionId = crypto.randomUUID();
     
    if (expires && (!(expires instanceof Date) || expires <= new Date())) {
        throw new Error("expires must be a future Date");
    }
    
    const expirationDate = expires || new Date(Date.now() + SESSION_EXPIRATION_TIME_MS);
    
    await sessions.insertOne({ 
        _id: sessionId, 
        user_id: userId,
        expires: expirationDate
    });
    return sessionId;
}

export async function getSessionUser(sessionId) {
    if (sessionId === null) return null;

    const client = await clientPromise;
    const sessions = client.db().collection("Sessions");
    const maybeSession = await sessions.findOne({ _id: sessionId });

    if (maybeSession) {
        if (!maybeSession.expires || new Date() > maybeSession.expires) {
            await sessions.deleteOne({ _id: sessionId });
            return null;
        }
        return maybeSession.user_id;
    }
    return null;
}

export async function getSessionAndUser(sessionId) {
    if (sessionId === null) return { session: null, user: null };

    const client = await clientPromise;
    const sessions = client.db().collection("Sessions");
    const maybeSession = await sessions.findOne({ _id: sessionId });

    if (!maybeSession) return { session: null, user: null };

    const session = maybeSession;

    if (!session.expires || new Date() > session.expires) {
        await sessions.deleteOne({ _id: sessionId });
        return { session: null, user: null };
    }

    const users = client.db().collection("Users");
    const user = await users.findOne({ _id: session.user_id });
    if (!user) return { session: null, user: null };

    return { session, user };
}

export async function updateSession(sessionId) {
    const client = await clientPromise;
    const sessions = client.db().collection("Sessions");
    
    const result = await sessions.findOneAndUpdate(
        { _id: sessionId },
        { $set: { expires: new Date(Date.now() + SESSION_EXPIRATION_TIME_MS) } }
    );
    
    return result.value;
}

export async function authenticateSession(sessionId) {
    return (await getSessionUser(sessionId)) !== null;
}

export async function endSession(sessionId) {
    const client = await clientPromise;
    const sessions = client.db().collection("Sessions");
    const result = await sessions.deleteOne({ _id: sessionId });
    return result.deletedCount > 0;
}