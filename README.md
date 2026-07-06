# Atlas Demo Dashboard

Atlas Demo Dashboard is a standalone Vue and TypeScript portfolio demo for an internal account-management dashboard. It uses only synthetic seed data and local mock services. No client name, customer record, credential, backend endpoint, map key, screenshot, or operational detail from the original private project is required to run or understand this version.

## Demo Scope

- Search, filter, sort, and paginate fictional account records.
- View synthetic account locations on a local non-API demo map.
- Open account detail cards with fake contacts, revenue summaries, and notes.
- Use a simulated login flow with route guards and logout behavior.
- View a demo profile generated from local seed data.
- Toggle light and dark mode.

## Demo Credentials

```text
Email: demo.manager@example.com
Password: portfolio-demo
```

Authentication is simulated for portfolio demonstration only. The session token is generated locally, stored under a demo-specific browser storage key, and is not connected to a real identity provider or backend.

## Data Notice

All accounts, users, phone numbers, email addresses, sales figures, comments, territory labels, and coordinates are fictional. The dataset was created for this public demo and should not be treated as anonymized production data.

## Local Data Architecture

- `src/data/demo-data.ts` contains the synthetic seed records and demo auth helper.
- `src/services/demo-data.service.ts` exposes local service-style methods for auth, accounts, comments, and geolocation.
- Network-backed `/api/*` calls were removed for the public portfolio demo.
- The map is a local visualization component and does not require a map API key.

## Portfolio Safety Checklist

Before publishing, confirm:

- No client names, logos, screenshots, or social links remain.
- No real customer, contact, account, territory, location, or revenue data remains.
- No real credentials, tokens, API URLs, API keys, hostnames, or environment secrets remain.
- No private backend endpoint documentation remains.
- No original screenshots or image assets from the private project remain.
- The public repository does not include private commit history or deleted confidential files.

## Development Notes

The original implementation patterns are intentionally preserved where they help demonstrate front-end engineering: Vue 3 Composition API, Pinia, Vue Router, typed DTOs, reusable filters, local services, and component-level dashboard interactions.
