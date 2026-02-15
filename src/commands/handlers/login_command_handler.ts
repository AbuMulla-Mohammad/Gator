import { setUser } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
    if (args.length == 0) {
        throw new Error("the login handler expects a single argument, the username.");
    }
    const userName = args[0];

    const dbUserName = await getUserByName(userName);
    if (!dbUserName) {
        throw new Error("User Not Found");
    }
    setUser(dbUserName.name);
    console.log("User name has been set successfully");

}