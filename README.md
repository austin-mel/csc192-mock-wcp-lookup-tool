# Atlas Demo Dashboard

Atlas Demo Dashboard is the public app name for this repository. The repository may be named `csc192-mock-wcp-lookup-tool` because the codebase began as a mock WCP lookup tool, but the package and running Vue app now use the sanitized portfolio name `atlas-demo-dashboard`.

In this public version, "WCP lookup tool" describes the original dashboard concept: a representative can look up account records, review territory details, and open account-level notes. "Atlas Demo Dashboard" is the cleaned-up demo version of that concept. It is not connected to any production WCP system.

## What This Is

This is a sanitized Vue 3 and TypeScript portfolio demo. It uses synthetic account data from `src/data/demo-data.ts` and local mock service methods from `src/services/demo-data.service.ts`. There are no real client records, customer records, credentials, API keys, backend endpoints, or map provider keys in the app.

## Feature Overview

- Sign in with a local demo account and route through protected dashboard pages.
- Search fictional accounts by name.
- Sort accounts by name or calculated distance.
- Filter account lists by region, recent purchase activity, and whether suspended accounts should be shown.
- View account status, address, monthly revenue, yearly revenue, and estimated distance.
- Open a synthetic account detail card with contact information, revenue badges, notes, call links, and demo-only directions.
- View account locations on a local demo map with synthetic coordinates.
- Review a demo user profile with assigned region, hire date, contact details, and assigned account count.
- Toggle light and dark mode.

## Local Setup

The repository includes `pnpm-lock.yaml`, so the commands below assume `pnpm`.

```bash
pnpm install
pnpm dev
```

The development server is started by Vite. Use the local URL printed by the command output.

No environment secrets are required. `environment/.example.front-end.env` contains only:

```bash
VITE_DEMO_MODE=true
```

The app currently runs from local synthetic seed data without a real backend.

## Login

Use the built-in demo credentials:

```text
Email: demo.manager@example.com
Password: portfolio-demo
```

Authentication is simulated locally. A demo token is generated in the browser and stored under the `portfolio_demo_session` local storage key. It is not issued by a real identity provider.

## Scripts

```bash
pnpm dev
pnpm test
pnpm build
pnpm preview
pnpm format
```

- `pnpm dev` starts the Vite development server.
- `pnpm test` runs the Vitest test suite.
- `pnpm build` runs TypeScript checking with `vue-tsc` and creates a production build with Vite.
- `pnpm preview` serves the built app locally after `pnpm build`.
- `pnpm format` formats the repository with Prettier.

## Local Data Architecture

- `src/data/demo-data.ts` holds the demo user, demo credentials, synthetic account records, geolocation, and notes.
- `src/services/demo-data.service.ts` provides local mock methods for login, account lookup, comments, and geolocation.
- `src/services/auth.service.ts`, `src/services/comment.service.ts`, and `src/services/geolocation.service.ts` call the local demo service layer.
- Dashboard state is handled in Vue components and providers under `src/components/Dashboard`.
- The account detail card and comment interactions are local demo interactions only.

## Glossary

- WCP: Legacy shorthand from the original lookup-tool concept. This public repo does not define or connect to a real WCP platform.
- Atlas: The public portfolio name for the sanitized dashboard demo.
- Account: A fictional organization record shown in the dashboard. The code also uses customer and client labels in places inherited from the original app.
- Customer/client: Alternate labels for the same synthetic account records.
- Territory/region: A fictional assignment area such as Northwest, Coastal, Southwest, or Central.
- Sales rep: The fictional representative assigned to a territory or account.
- Suspended status: A demo account state used to show inactive or paused accounts. It is only sample data.
- Last purchased: A filter based on synthetic month-to-date and year-to-date sales values.
- MTD/YTD revenue: Demo month-to-date and year-to-date sales totals.
- Demo map: A local visualization of synthetic account coordinates. It does not call a map API.

## Privacy And Sanitization

This repository is designed for public portfolio review. All account names, people, addresses, phone numbers, email addresses, sales totals, comments, territory labels, and coordinates are synthetic.

No real client or customer data is included. No production credentials, tokens, backend URLs, map keys, screenshots, logos, or operational details are required to run or understand this demo. The local mock services intentionally replace any private API integration that may have existed in the original project context.
