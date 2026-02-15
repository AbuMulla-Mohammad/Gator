import { createFeed } from "src/lib/db/queries/feeds";
import { toUUID } from "../helpers/ids";
import { createFeedFollow } from "src/lib/db/queries/feed_follows";
import { Feed, User } from "../types";


export async function handlerAddFeed(cmdNam:string,user:User,...args:string[]) {
    if (args.length < 2) {
        throw new Error("the Add Feed handler expects a two arguments, the name and the url.");
    }

    const userUUID = toUUID(user.id);

    const feedName = args[0];
    const feedUrl = args[1];
    
    const createdFeed = await createFeed(feedName, feedUrl, userUUID);
    const createdFeedUUID=toUUID(createdFeed.id)

    await createFeedFollow(userUUID, createdFeedUUID);

    printFeed(createdFeed,user)
    console.log("feed added successfully")

}



function printFeed(feed: Feed, user: User) {
    console.log(`Added feed: ${feed.name}`);
    console.log(`URL: ${feed.url}`);
    console.log(`User: ${user.name}`);
}