# Atlas Demo Dashboard

## Table of Contents

- [Project Summary](#project-summary)
- [Technologies Used](#technologies-used)
- [Necessary Tools](#necessary-tools)
- [Application Setup](#application-setup)
    - [Set Up the Development Environment](#set-up-the-development-environment)
    - [Front-end Setup](#front-end-setup)
    - [Verify the Setup](#verify-the-setup)
- [Demo credentials](#demo-credentials)
- [Demo walkthrough](#demo-walkthrough)
- [Development commands](#development-commands)
- [Data and privacy](#data-and-privacy)
- [Documentation](#documentation)
    - [Developer references](#developer-references)
    - [Key terms](#key-terms)

## Project Summary

Atlas Demo Dashboard demonstrates how account representatives can find organizations, review account details, and record notes in one workspace. The application runs in the browser with synthetic data and local demo services.

- Search accounts by name and sort results by name or distance.
- Filter accounts by region, purchase activity, and suspended status.
- Review account status, addresses, contacts, and month-to-date and year-to-date revenue.
- Add account comments and explore locations on an illustrative map.
- View the demo representative's profile, region, and assigned account count.
- Switch between light and dark themes and use the dashboard on desktop or mobile.

## Technologies Used

[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-F7D336?style=for-the-badge&logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![Vue Router](https://img.shields.io/badge/Vue%20Router-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://router.vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

## Necessary Tools

Install these tools before setting up the application. Use Node.js 22 and pnpm 10 as a compatible baseline for these instructions; the repository does not pin their versions.

| Tool                                                            | Purpose                                           |
| --------------------------------------------------------------- | ------------------------------------------------- |
| [Git](https://git-scm.com/downloads)                            | Clone the project.                                |
| [Node.js 22](https://nodejs.org/en/download)                    | Run the application and build tools.              |
| [pnpm 10](https://pnpm.io/10.x/installation)                    | Install dependencies and run project commands.    |
| [Visual Studio Code](https://code.visualstudio.com/) (optional) | Explore the source, or use your preferred editor. |

## Application Setup

The demo requires only the frontend. You do not need a backend, database, environment file, or API keys.

### Set Up the Development Environment

1. Install Git and Node.js from [Necessary Tools](#necessary-tools), then verify the installations:

    ```sh
    git --version
    node --version
    npm --version
    ```

2. Install pnpm 10 if needed and verify it:

    ```sh
    npm install -g pnpm@10
    pnpm --version
    ```

3. Open a terminal in the folder where you want to keep the project. The commands below work in PowerShell, macOS, and Linux terminals.

### Front-end Setup

1. Clone the demo branch and enter its folder. If you already have this checkout, open its folder and skip cloning.

    ```sh
    git clone --branch clean.apps.front-end https://github.com/austin-mel/csc192-mock-wcp-lookup-tool.git atlas-demo-dashboard
    cd atlas-demo-dashboard
    ```

2. Install dependencies:

    ```sh
    pnpm install
    ```

3. Start the application:

    ```sh
    pnpm dev
    ```

4. Open the local URL Vite prints, usually `http://localhost:5173`, and sign in with the [demo credentials](#demo-credentials). Keep the terminal running; press `Ctrl+C` to stop the server.

### Verify the Setup

From the project folder, run the unit tests once and build the application:

```sh
pnpm test --run
pnpm build
```

After the build succeeds, preview it locally:

```sh
pnpm preview
```

Open the preview URL and confirm that you can sign in, search for an account, and open its details. Preview serves the built application locally; it does not publish the demo.

## Demo credentials

Use this account on the login page and select **Sign In**.

| Role    | Demo user     | Email                      | Password         |
| ------- | ------------- | -------------------------- | ---------------- |
| Manager | Jordan Rivera | `demo.manager@example.com` | `portfolio-demo` |

## Demo walkthrough

1. **Sign in:** Use the credentials above to open **Dashboard**.
2. **Find an account:** Enter `Evergreen` in **Search Accounts...**. Clear the search to restore the account list.
3. **Sort results:** Open **Order By** and choose **Name A→Z**, **Name Z→A**, **Distance A→Z**, or **Distance Z→A**. Distance sorts run from nearest to farthest or farthest to nearest.
4. **Filter accounts:** Select the filter icon beside the search box. Choose a **Region**, set **Last Purchased**, or enable **Show Suspended Accounts**. Clear region selections and choose **All** under **Last Purchased** to broaden the results.
5. **Review details:** Close the filters and select an account from the results. Review its status, revenue, address, and available contact details.
6. **Add a note:** Under **Comments**, enter a note and select **Add Comment**. Close and reopen the account to review it. Reloading the page resets comment changes.
7. **Explore the map:** Close the account card and select a map marker to open another account. The map displays accounts on the current results page. On mobile, use **Show Map** and **Show Results** to switch views.
8. **Review the profile:** Select **Profile** to view the demo user's region, hire date, contact details, and assigned account count.
9. **Change the theme and sign out:** Use the theme toggle in the header, then select **Logout** when finished.

## Development commands

| Task                                             | Command           |
| ------------------------------------------------ | ----------------- |
| Start the development server                     | `pnpm dev`        |
| Run unit tests in watch mode                     | `pnpm test`       |
| Run unit tests once                              | `pnpm test --run` |
| Check TypeScript types and build the application | `pnpm build`      |
| Preview the production build locally             | `pnpm preview`    |
| Format repository files with Prettier            | `pnpm format`     |

Run `pnpm build` before `pnpm preview`. Formatting rewrites files; use it when preparing source changes.

## Data and privacy

The demo uses synthetic account, contact, sales, and comment data. Local services provide application behavior without a production API, identity provider, or map service.

The browser stores the demo session and theme preference in local storage, so both survive a page reload. **Logout** clears the session. The app keeps comments in memory and restores the original comments when you reload the page. Demo login illustrates the sign-in workflow; it does not provide production authentication.

Distances use a fixed demo location, not your device's position or driving routes. The map illustrates account locations, and **Directions** displays a demo message. The visible **Distance (mi)** slider does not currently filter results; distance sorting remains available through **Order By**.
