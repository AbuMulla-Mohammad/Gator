import { UUID } from "node:crypto";
import { db } from "..";
import { feed_follows, feeds, users } from "../schema";
import { eq, sql } from "drizzle-orm";

export async function createFeed(name:string,url:string,user_id:UUID) {
    const [result] = await db.insert(feeds).values({
        name,
        url,
        user_id,
    }).returning();
    return result;
}

export async function getAllFeedsWithUserName() {
    const result = await db.select().from(feeds).innerJoin(users, eq(users.id, feeds.user_id));
    return result;
}


export async function getFeedByURL(url: string) {
    const [result] = await db.select().from(feeds).where(eq(feeds.url, url));
    return result;
}


export async function markFeedFetched(feed_id:UUID) {
    const [result] = await db.update(feeds)
        .set({ updated_at: new Date(), last_fetched_at: new Date() })
        .where(eq(feeds.id, feed_id))
        .returning();
    return result;
}

export async function getNextFeedToFetch() {
    const [result] = await db.select().from(feeds)
        .orderBy(sql`${feeds.last_fetched_at} ASC NULLS FIRST`)
        .limit(1);
    return result;
}