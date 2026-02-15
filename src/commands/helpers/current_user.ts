import { readConfig } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";
import { User } from "../types";


export async function getCurrentUser(): Promise<User> {
  const currentUserName = readConfig().currentUserName;
  if (!currentUserName) {
    throw new Error("Can't find user name in the config");
  }

  const dbUser = await getUserByName(currentUserName);
  if (!dbUser) {
    throw new Error("User not found");
  }

  return dbUser;
}