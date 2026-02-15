import { UUID } from "node:crypto";
import { db } from "..";
import { feed_follows, feeds, users } from "../schema";
import { eq } from "drizzle-orm";

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

