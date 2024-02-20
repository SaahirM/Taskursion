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
    return getSessionUser(sessionId) !== null;
}

export async function endSession(sessionId) {
    client.connect()
        .then(async () => {
            const sessions = client.db().collection("Sessions");
            await sessions.deleteOne({ _id: sessionId });
        })
        .finally(async () => { await client.close(); });
}