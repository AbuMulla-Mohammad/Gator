import { fetchFeed } from "src/rss/fetch_feed";

export async function handlerAgg(cmdName: string, ...args: string[]) {
    const feedURL = "https://www.wagslane.dev/index.xml";

    const feed = await fetchFeed(feedURL);
    console.log(JSON.stringify(feed, null, 2));
}