import { feeds, users } from "src/lib/db/schema";




export type User = typeof users.$inferSelect;
export type Feed = typeof feeds.$inferSelect;