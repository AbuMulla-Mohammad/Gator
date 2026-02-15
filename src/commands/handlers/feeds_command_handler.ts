import { getAllFeedsWithUserName } from "src/lib/db/queries/feeds";

export async function handlerFeeds(cmdName: string, ...args: string[]) {
    if (args.length > 0) {
        throw new Error("feeds takes no arguments");
    }
    const feedsWithUserName = await getAllFeedsWithUserName();
    feedsWithUserName.forEach(f => {
        console.log(`Feed: ${f.feeds.name}`);
        console.log(`URL: ${f.feeds.url}`);
        console.log(`By: ${f.users.name}`);
    })

}