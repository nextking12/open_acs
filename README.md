# Open ACS

Open ACS is a Next.js learning platform for physical access control systems. The current app has a small vertical slice: Postgres for storage, Prisma for the data layer, seed content for an access control fundamentals course, and a `/courses` page that reads from the database.

## Tech Stack

- Next.js 16 with the App Router
- React 19
- Tailwind CSS 4
- Prisma 7
- Postgres 17 through Docker Compose
- pnpm for package management

## Local Setup

Install dependencies:

```bash
pnpm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Start Postgres:

```bash
docker compose up -d
```

Generate the Prisma client:

```bash
pnpm db:generate
```

Run database migrations:

```bash
pnpm db:migrate
```

Load the starter course content:

```bash
pnpm db:seed
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Useful Commands

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm exec prisma validate
pnpm build
```

## Database Notes

The local database settings live in `.env`. The default values in `.env.example` match `docker-compose.yml`.

Prisma schema changes should be made in `prisma/schema.prisma`, then applied with:

```bash
pnpm db:migrate
```

The generated Prisma client is written to `generated/prisma` and is ignored by git.

## License

This project is licensed under the [MIT License](LICENSE).
