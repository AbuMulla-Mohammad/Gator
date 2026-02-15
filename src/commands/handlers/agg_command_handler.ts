import { getNextFeedToFetch, markFeedFetched } from "src/lib/db/queries/feeds";
import { fetchFeed } from "src/rss/fetch_feed";
import { toUUID } from "../helpers/ids";

export async function handlerAgg(cmdName: string, ...args: string[]) {
    if (args.length !== 1) {
        throw new Error("agg expects exactly one argument: time between requests");
    }
    
    const timeBetweenRequests = parseDuration(args[0]);

    console.log(`Collecting feeds every ${formatDuration(timeBetweenRequests)}`);

    const handleError = (err: unknown) => {
        console.error("agg error:", err instanceof Error ? err.message : err);
    };
    
    scrapeFeeds().catch(handleError);

    const interval = setInterval(()=> {
        scrapeFeeds().catch(handleError);
    }, timeBetweenRequests);
    
    await new Promise<void>((resolve) => {
        process.on("SIGINT", () => {
            console.log("Shutting down feed aggregator...");
            clearInterval(interval);
            resolve();
        });
    });
}

async function scrapeFeeds() {
    const nextFeedToFetch = await getNextFeedToFetch();
    if (!nextFeedToFetch) {
        console.log("no feeds to fetch");
        return;
    }


    await markFeedFetched(toUUID(nextFeedToFetch.id));

    const response = await fetchFeed(nextFeedToFetch.url);

    response.channel.item.forEach(i => {
        console.log(`Title: ${i.title}`);
    });
}

function parseDuration(durationStr: string): number{
    const regex = /^(\d+)(ms|s|m|h)$/;
    const match = durationStr.match(regex);

    if(!match){
        throw new Error("Invalid duration");
    }

    const value = Number(match[1]);
    const unit = match[2];
    
    switch (unit) {
        case 'ms':
            return value;
        case 's':
            return value * 1000;
        case 'm':
            return value * 60 * 1000;
        case 'h':
            return value * 60 * 60 * 1000;
        default:
            throw new Error("Invalid duration unit");
    }
}
 
function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m${seconds}s`;
}