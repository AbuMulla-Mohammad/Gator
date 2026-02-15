import { deleteAllUsers } from "src/lib/db/queries/users";

export async function handlerReset(cmdName: string, ...args: string[]) {
    await deleteAllUsers();
    console.log("All users deleted successfully");
}