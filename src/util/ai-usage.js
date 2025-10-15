import clientPromise from "../db/db";

const parsedUserUses = parseInt(process.env.NEXT_PUBLIC_USER_MONTHLY_AI_USES);
const parsedGlobalUses = parseInt(process.env.GLOBAL_MONTHLY_AI_USES);
const MAX_USER_MONTHLY_USES = isNaN(parsedUserUses) ? 5 : parsedUserUses;
const MAX_GLOBAL_MONTHLY_USES = isNaN(parsedGlobalUses) ? 100 : parsedGlobalUses;

export async function getRemainingUsage(userId) {
    const client = await clientPromise;
    const aiSummaryUsage = client.db().collection("AISummaryUsage");
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setUTCMonth(thirtyDaysAgo.getUTCMonth() - 1);
    const usesLastThirtyDays = await aiSummaryUsage.countDocuments({
        user_id: String(userId),
        generated_at: { $gte: thirtyDaysAgo }
    });
    
    return Math.max(0, MAX_USER_MONTHLY_USES - usesLastThirtyDays);
}

export async function isGlobalUsageExceeded() {
    const client = await clientPromise;
    const aiSummaryUsage = client.db().collection("AISummaryUsage");

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setUTCMonth(thirtyDaysAgo.getUTCMonth() - 1);
    const usesLastThirtyDays = await aiSummaryUsage.countDocuments({
        generated_at: { $gte: thirtyDaysAgo }
    });

    return usesLastThirtyDays >= MAX_GLOBAL_MONTHLY_USES;
}