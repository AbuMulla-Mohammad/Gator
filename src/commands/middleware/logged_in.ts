import { CommandHandler } from "../registry";
import { readConfig } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";
import { User } from "../types";


type UserCommandHandler = (
    cmdName: string,
    user: User,
    ...args: string[]
) => Promise<void>;

type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export function middlewareLoggedIn(handler: UserCommandHandler): CommandHandler {
  return async (cmdName, ...args) => {
    const currentUserName = readConfig().currentUserName;
    if (!currentUserName) {
      throw new Error("No user is logged in");
    }
    const user = await getUserByName(currentUserName);
    if (!user) {
      throw new Error(`User ${currentUserName} not found`);
    }
    await handler(cmdName, user, ...args);
  };
}