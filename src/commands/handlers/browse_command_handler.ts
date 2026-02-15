import { getPostsForUser } from "src/lib/db/queries/posts";
import { User } from "../types";
import { toUUID } from "../helpers/ids";

export async function handlerBrowse(cmdName: string, user: User, ...args: string[]) {
    let limit = 2;
    if (args.length > 1) {
        throw new Error("browse accepts at most one argument: limit");
    }
    if (args.length === 1) {
        const parsed = Number(args[0]);
        if (!Number.isInteger(parsed) || parsed <= 0) {
            throw new Error("limit must be a positive integer");
        }
        limit = parsed;
    }
    const posts = await getPostsForUser(toUUID(user.id), limit);

    posts.forEach(p => {
        console.log(`Title: ${p.posts.title}`);
        console.log(`Published at: ${p.posts.published_at}`);
        console.log(`URL: ${p.posts.url}`);
        console.log(`Description: ${p.posts.description}\n`);
    });
    console.log(posts.length+"-------------------------------------")

}