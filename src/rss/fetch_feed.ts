import { XMLParser } from "fast-xml-parser";
import { RSSFeed, RSSItem } from "./types";

export async function fetchFeed(feedUrl: string): Promise<RSSFeed> {
    const response = await fetch(feedUrl, {
        headers: { "User-Agent": "gator" },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch feed: ${response.status}`);
    }

    const xmlText = await response.text();
    const parsed = new XMLParser().parse(xmlText);

    const channel = getValidChannel(parsed);
    const items = parseItems(channel.item);

    return {
        channel: {
            title: channel.title,
            link: channel.link,
            description: channel.description,
            item: items,
        },
    };
}


function getValidChannel(parsed: any) {
    const channel = parsed?.rss?.channel;

    if (!channel) {
        throw new Error("Invalid RSS feed: missing channel");
    }

    if (!channel.title || !channel.link || !channel.description) {
        throw new Error("Invalid RSS feed: missing required metadata");
    }

    return channel;
}

function parseItems(raw: any): RSSItem[] {
    if (!raw) return [];

    const rawItems = Array.isArray(raw) ? raw : [raw];

    return rawItems
        .filter(
            (item) =>
                item.title &&
                item.link &&
                item.description &&
                item.pubDate
        )
        .map((item) => ({
            title: item.title,
            link: item.link,
            description: item.description,
            pubDate: item.pubDate,
        }));
}
