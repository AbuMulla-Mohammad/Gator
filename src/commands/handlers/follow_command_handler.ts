import { createFeedFollow } from "src/lib/db/queries/feed_follows";
import { getFeedByURL } from "src/lib/db/queries/feeds";
import { toUUID } from "../helpers/ids";
import { User } from "../types";


export async function handlerFollow(cmdName: string,user:User, ...args: string[]) {
    if (args.length === 0) {
        throw new Error("The URL is missing");
    }
    const url = args[0];

    const currentUserId = toUUID(user.id);
    
    const feed = await getFeedByURL(url);
    if (!feed)
        throw new Error("Feed Not Found");
    const feedId = toUUID(feed.id);
    const feedsFollow = await createFeedFollow(currentUserId, feedId);;

    console.log(`Feed Name: ${feedsFollow.feeds.name}`);
    console.log(`User Name: ${feedsFollow.users.name}`);

}
