import { UUID } from "node:crypto";
import { db } from "..";
import { feed_follows, feeds, users } from "../schema";
import { and, eq } from "drizzle-orm";
import { getFeedByURL } from "./feeds";

export async function createFeedFollow(user_id:UUID,feed_id:UUID) {
    const [newFeedFollow] = await db.insert(feed_follows).values({
        user_id,
        feed_id
    }).returning();
    const [feedsFollowWithUserAndFeed] = await db.select().from(feed_follows)
        .innerJoin(users, eq(feed_follows.user_id, users.id))
        .innerJoin(feeds, eq(feed_follows.feed_id, feeds.id))
        .where(eq(feed_follows.id, newFeedFollow.id));
    
    return feedsFollowWithUserAndFeed;
}

export async function getFeedFollowsForUser(user_id:UUID) {
    const result = await db.select().from(feed_follows)
        .innerJoin(feeds, eq(feeds.id, feed_follows.feed_id))
        .innerJoin(users, eq(users.id, feed_follows.user_id))
        .where(eq(feed_follows.user_id, user_id));
    
    return result;
}

export async function deleteFollowByUserIdAndFeedUrl(user_id: UUID, feed_url: string) {
    const feed = await getFeedByURL(feed_url);
    if (!feed) {
        throw new Error("Feed not found");
    }

    const result = await db.delete(feed_follows).where(and(
        eq(feed_follows.user_id, user_id),
        eq(feed_follows.feed_id, feed.id)
    )).returning();
    
    return result;
}