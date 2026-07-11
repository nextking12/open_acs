# PhySec.Learn

PhySec.Learn is a Next.js learning platform for physical access control systems. Postgres and Prisma store the published curriculum, while lesson completion is kept privately in each visitor's browser. No account is required.

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
pnpm test
pnpm exec prisma validate
pnpm build
```

Tests run with [Vitest](https://vitest.dev/). Use `pnpm test:watch` for watch mode. GitHub Actions runs lint, typecheck, tests, and build on every push and pull request (see `.github/workflows/ci.yml`).

## Deploy to Vercel

The app requires Node.js 22 and one hosted Postgres database. Use a pooled,
SSL-enabled connection URL from a serverless-friendly provider such as Neon,
Supabase, or Vercel Postgres.

1. Provision the database and keep its connection URL secret.
2. From a trusted machine, apply migrations and load the idempotent starter
   content:

   ```bash
   DATABASE_URL="postgresql://..." pnpm db:migrate:deploy
   DATABASE_URL="postgresql://..." pnpm db:seed
   ```

3. Import the repository into Vercel and add `DATABASE_URL` to the Production
   environment. Use a separate database for Preview deployments, or leave
   previews disabled; do not expose the production database to untrusted
   preview branches.
4. Keep Vercel's detected pnpm install command and `pnpm build` build command.
   The build script generates the Prisma client before running Next.js.
5. Deploy, then verify `/`, `/courses`, a lesson page, and completion
   persistence after refreshing the browser.

Run `pnpm db:migrate:deploy` before a deployment that includes new migrations.
Take a provider snapshot before destructive migrations. Rolling back a Vercel
deployment does not roll back its database, so restore or forward-fix the
database separately if a migration fails.

Lesson completion uses `localStorage`; it is intentionally not authoritative,
does not cross devices, and disappears when visitors clear site data. The
database contains only public course content.

## Database Notes

The local database settings live in `.env`. The default values in `.env.example` match `docker-compose.yml`.

Prisma schema changes should be made in `prisma/schema.prisma`, then applied with:

```bash
pnpm db:migrate
```

The generated Prisma client is written to `generated/prisma` and is ignored by git.

Production uses `pnpm db:migrate:deploy` (`prisma migrate deploy`), never the
interactive development migration command.

## License

This project is licensed under the [MIT License](LICENSE).
