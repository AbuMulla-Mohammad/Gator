import { getFeedFollowsForUser } from "src/lib/db/queries/feed_follows";
import { toUUID } from "../helpers/ids";
import { User } from "../types";


export async function handlerFollowing(cmdName: string,user:User, ...args: string[]) {
    if (args.length > 0) {
        throw new Error("feeds takes no arguments");
    }
    
    const userId = toUUID(user.id);

    const userFeeds = await getFeedFollowsForUser(userId);
    
    userFeeds.forEach(f => {
        console.log(f.feeds.name);
    });
}