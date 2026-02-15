import { UUID } from "node:crypto";
import { db } from "..";
import { feed_follows, feeds, posts, users } from "../schema";
import { desc, eq } from "drizzle-orm";

export async function createPost(title: string, url: string, description: string, published_at: Date, feed_id: UUID) {
    const [result] = await db.insert(posts).values({
        title,
        url,
        description,
        published_at,
        feed_id
    }).returning();

    return result;
}

export async function getPostsForUser(user_id: UUID, number_of_posts: number) {
    const result = await db.select().from(posts)
        .innerJoin(feeds, eq(feeds.id, posts.feed_id))
        .innerJoin(feed_follows, eq(feed_follows.feed_id, feeds.id))
        .innerJoin(users, eq(users.id, feed_follows.user_id))
        .where(eq(users.id, user_id))
        .orderBy(desc(posts.published_at))
        .limit(number_of_posts);
    
    return result;
}