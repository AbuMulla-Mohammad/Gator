import { pgTable, timestamp, uuid, text, unique } from "drizzle-orm/pg-core";


export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    name: text("name").notNull().unique(),
});

export const feeds = pgTable("feeds", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    last_fetched_at:timestamp("last_fetched_at"),
    name: text("name").notNull(),
    url: text("url").notNull().unique(),
    user_id: uuid("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull()

})

export const feed_follows = pgTable("feed_follows", {
    id: uuid("id").primaryKey().defaultRandom(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    user_id: uuid("user_id").references(() => users.id, { onDelete: 'cascade' }).notNull(),
    feed_id: uuid("feed_id").references(() => feeds.id, { onDelete: "cascade" }).notNull(),
},
    (table) => ({
        userFeedUnique: unique("feed_follows_user_id_feed_id_unique").on(
            table.user_id,
            table.feed_id
    ),
}));

export const posts = pgTable("posts", {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    title: text("title").notNull(),
    url: text("url").notNull().unique(),
    description: text("description"),
    published_at: timestamp("published_at"),
    feed_id: uuid("feed_id").references(() => feeds.id, { onDelete: "cascade" }).notNull(),
})