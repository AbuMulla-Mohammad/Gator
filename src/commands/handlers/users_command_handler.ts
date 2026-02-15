import { readConfig } from "src/config";
import { getUsers } from "src/lib/db/queries/users";

export async function handlerUsers(cmdName: string, ...args: string[]) {
    const users = await getUsers();
    const currentUserName = readConfig().currentUserName;

    users.forEach(u => {
        if (u.name === currentUserName) {
            console.log(`* ${u.name} (current)`);
            return;
        }
        console.log(`* ${u.name}`);
    });
}