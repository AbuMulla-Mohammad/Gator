import { deleteFollowByUserIdAndFeedUrl } from "src/lib/db/queries/feed_follows";
import { User } from "../types";
import { toUUID } from "../helpers/ids";

export async function handlerUnfollow(cmdName: string, user: User, ...args: string[]) {
    if (args.length === 0) {
        throw new Error("Unfollow command must have feed url");
    }
    const feedUrl = args[0];
    const userUUID = toUUID(user.id);

    const result = await deleteFollowByUserIdAndFeedUrl(userUUID, feedUrl);

    if (result.length=== 0) {
        console.log("You were not following this feed.");
    } else {
        console.log(`Unfollowed feed: ${feedUrl}`);
    }
}