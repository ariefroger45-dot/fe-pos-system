<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

Next.js 16.3.5 + React 19 App Router POS demo. No tests, no CI, no `opencode.json`.

## Commands

- `npm run dev` / `npm run build` / `npm run start` / `npm run lint` (`next lint` equivalent via eslint-config-next). No test, typecheck, or format scripts — use `npx tsc --noEmit` for types.
- Path alias: `@/*` maps to repo root (`./*`), so `@/components/...`, `@/store/...`, `@/product` work. shadcn aliases in `components.json` (`utils` → `@/lib/utils`, `ui` → `@/components/ui`).

## Auth (demo cookie, dual-enforced)

- Login form posts to `loginAction` (`app/login/actions.ts`, server action) which sets httpOnly cookie `pos_auth_token=demo-<username>` and redirects to `/dashboard`.
- Route guard is `proxy.ts` (Next 16 name — **not** `middleware.ts`), matcher `["/dashboard/:path*", "/login"]`. `app/dashboard/layout.tsx` re-checks the cookie via `cookies()` + `redirect("/login")`. Keep both in sync when touching auth.

## State, styling, data

- Redux Toolkit singleton in `store/store.tsx` (`cart.totalItems`), provided client-side by `app/providers/StoreProvider.tsx` in root layout. Module-level singleton is client-only — don't import the store into server components/actions.
- Tailwind v4 (`@tailwindcss/postcss`), tokens in `app/globals.css`. shadcn `base-nova`, CSS vars on. `lib/utils.ts` is just `export { cn } from "cn"` — not the usual clsx/tailwind-merge helper.
- External data comes from `dummyjson.com` fetched directly in server components. `next/image` allows only `cdn.dummyjson.com` + `images.unsplash.com` (`next.config.ts`) — other hosts fail at runtime.
- `product.ts` (repo root) is the zod schema for external products; `SafeProductList` validates with `safeParse` and throws on mismatch (nearest error boundary / Suspense fallback in `app/dashboard/page.tsx` handles it).

## Gotchas

- **`zod` is imported (`product.ts`, `SafeProductList`) but missing from `package.json` dependencies** — it only resolves today via hoisted transitive copy (4.6.5). Fresh installs may break; run `npm i zod` instead of working around it. Same check applies if a build complains about `cn`/`shadcn` runtime packages.
- `app/dashboard/live-transactions/page.tsx` uses `export const dynamic = "force-dynamic"` (commented-out `noStore` alternative above it) — keep it dynamic, it's a realtime monitor.
- `backup/` holds legacy `pos-*` reference apps — never import from it, exclude from refactors. `types/` is empty, `app/dashboard/login/` is an empty stub, `app/dashboard/loading.tsx.bak` is stale (yet listed in `tsconfig.json` `include` — leave it unless cleaning up deliberately).
- `.env*` is gitignored; `.env` / `.env.local` exist locally (`NEXT_PUBLIC_URL`, `NEXT_BACKEND_URL`). Never commit them.
