import clientPromise from "@/src/db/db";

export async function GET(req) {
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    const client = await clientPromise;
    const users = client.db().collection("Users");
    const tasks = client.db().collection("Tasks");
    const sessions = client.db().collection("Sessions");

    const now = new Date();
    const expiredDemoUsers = await users.find({
        auth_type: "demo",
        demo_user_expires: { $lte: now }
    }).toArray();
    const expiredDemoUserIds = expiredDemoUsers.map(user => user._id);

    if (expiredDemoUserIds.length > 0) {
        console.log(`Deleting ${expiredDemoUserIds.length} expired demo accounts.`);
        await tasks.deleteMany({ "_id.user_id": { $in: expiredDemoUserIds.map(id => String(id)) } });
        await sessions.deleteMany({ user_id: { $in: expiredDemoUserIds } });
        await users.deleteMany({ _id: { $in: expiredDemoUserIds } });
    }

    return Response.json({ success: true });
}