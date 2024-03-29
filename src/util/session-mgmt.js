import clientPromise from "../db/db";

export async function startSession(userId) {
    const client = await clientPromise;
    const sessions = client.db().collection("Sessions");
    const sessionId = crypto.randomUUID();
    await sessions.insertOne({ _id: sessionId, user_id: userId });
    return sessionId;
}

export async function getSessionUser(sessionId) {
    if (sessionId === null) return null;

    const client = await clientPromise;
    const sessions = client.db().collection("Sessions");
    const maybeSession = await sessions.findOne({ _id: sessionId });

    if (maybeSession) {
        return maybeSession.user_id;
    }
    return null;
}

export async function authenticateSession(sessionId) {
    return (await getSessionUser(sessionId)) !== null;
}

export function endSession(sessionId) {
    clientPromise.then(client => {
        const sessions = client.db().collection("Sessions");
        sessions.deleteOne({ _id: sessionId });
    });
}