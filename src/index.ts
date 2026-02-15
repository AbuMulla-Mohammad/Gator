import { handlerAddFeed } from "./commands/handlers/addFeed_command_handler";
import { handlerAgg } from "./commands/handlers/agg_command_handler";
import { handlerFeeds } from "./commands/handlers/feeds_command_handler";
import { handlerFollow } from "./commands/handlers/follow_command_handler";
import { handlerFollowing } from "./commands/handlers/following_command_handler";
import { handlerLogin } from "./commands/handlers/login_command_handler";
import { handlerRegister } from "./commands/handlers/register_command_handler";
import { handlerReset } from "./commands/handlers/reset_command_handler";
import { handlerUnfollow } from "./commands/handlers/unfollow_command_handler";
import { handlerUsers } from "./commands/handlers/users_command_handler";
import { middlewareLoggedIn } from "./commands/middleware/logged_in";
import { CommandsRegistry, registerCommand, runCommand } from "./commands/registry";
import { closeDb } from "./lib/db";

async function main() {
  const argv = process.argv.slice(2);
  if (argv.length < 1) {
    console.log("Not enough arguments");
    process.exit(1);
  }
  const registry: CommandsRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerUsers);
  registerCommand(registry, "agg", handlerAgg);
  registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
  registerCommand(registry, "feeds", handlerFeeds);
  registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
  registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));
  registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnfollow));
  

  const [cmdName, ...args] = argv;

  try {
    await runCommand(registry, cmdName, ...args);
  } catch (err) {
    console.error("Error:", err instanceof Error ? err.message : err);
    process.exit(1);
  } finally {
    await closeDb();
  }
  process.exit(0);
}

process.on("SIGINT", async () => {
  await closeDb();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await closeDb();
  process.exit(0);
});

await main();