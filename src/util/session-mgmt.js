import client from "./db";

export async function startSession(userId) {
    return client.connect()
        .then(async () => {
            const sessions = client.db().collection("Sessions");
            const sessionId = crypto.randomUUID();
            await sessions.insertOne({ _id: sessionId, userId });
            return sessionId;
        })
        .finally(async () => { await client.close(); })
}

export async function getSessionUser(sessionId) {
    if (sessionId === null) return null;

    return client.connect()
        .then(async () => {
            const sessions = client.db().collection("Sessions");
            const maybeSession = await sessions.findOne({ _id: sessionId });

            if (maybeSession) {
                return maybeSession.userId;
            }
            return null;
        })
        .finally(async () => { await client.close(); });
}

export async function authenticateSession(sessionId) {
    return (await getSessionUser(sessionId)) !== null;
}

export function endSession(sessionId) {
    client.connect()
        .then(async () => {
            const sessions = client.db().collection("Sessions");
            await sessions.deleteOne({ _id: sessionId });
        })
        .finally(async () => { await client.close(); });
}