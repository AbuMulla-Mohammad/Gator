import { setUser } from "src/config";
import { createUser, getUserByName } from "src/lib/db/queries/users";

export async function handlerRegister(cmdName: string, ...args: string[]) {
    if (args.length == 0) {
        throw new Error("the register handler expects a single argument, the username.");
    }
    
    const userName = args[0].trim();
    const existingUser = await getUserByName(userName);
    if (existingUser)
        throw new Error("User already exists");
    await createUser(userName);
    console.log("registered successfully");
    setUser(userName);
}