
# Gator CLI

A simple RSS feed aggregator CLI. It lets you register/login users, add and follow feeds, scrape posts, and browse recent posts in the terminal.

## Requirements

- Node.js (v22.15.0+ recommended)
- A running Postgres database
- `npm` (or `pnpm`/`yarn`)

## Setup

1) Install dependencies:
```bash
npm install
```

2) Create a config file at:
```
~/.gatorconfig.json
```

Example config:
```json
{
  "db_url": "postgres://USER:PASSWORD@localhost:5432/gator",
  "current_user_name": null
}
```

3) Run database migrations (if you use Drizzle):
```bash
npm run db:migrate
```

## Usage

Run commands with:

```bash
npm run start <command> [args...]
```

### Common commands

- Register a user:
```bash
npm run start register <username>
```

- Login:
```bash
npm run start login <username>
```

- Add a feed:
```bash
npm run start addfeed "<name>" "<url>"
```

- Follow a feed:
```bash
npm run start follow "<url>"
```

- List feeds:
```bash
npm run start feeds
```

- List followed feeds:
```bash
npm run start following
```

- Aggregate feeds (runs continuously):
```bash
npm run start agg 30s
```

- Browse latest posts (default limit = 2):
```bash
npm run start browse
npm run start browse 5
```

### Example RSS feeds

- TechCrunch: https://techcrunch.com/feed/
- Hacker News: https://news.ycombinator.com/rss
- Boot.dev Blog: https://blog.boot.dev/index.xml

## Notes

- Use `Ctrl+C` to stop the `agg` command.
- The aggregator stores posts in the database and ignores duplicates by URL.
