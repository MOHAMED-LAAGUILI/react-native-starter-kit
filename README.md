# React Native Starter Kit

A production-ready [React Native](https://reactnative.dev/) starter built with [Expo SDK 57](https://expo.dev/), [Expo Router](https://expo.dev/router), [Tailwind CSS v4](https://tailwindcss.com/) via [Uniwind](https://uniwind.dev/), [Zustand](https://github.com/pmndrs/zustand), [TanStack Query](https://tanstack.com/query), and [React Native Reusables](https://reactnativereusables.com).

## Quick Start

```bash
git clone <repo> my-app
cd my-app
bun install
bun dev
```

## ENV
create .env.staging env.development env.production
API_URL=http://localhost:3000/api
ENABLE_ANALYTICS=false
ENABLE_CRASH_REPORTING=false


Press `i` (iOS), `a` (Android), or `w` (Web). Or scan the QR with [Expo Go](https://expo.dev/go).

## Commands

| Script | Purpose |
|--------|---------|
| `bun dev` | Start Expo dev server (fresh cache) |
| `bun run ios` | Dev server targeting iOS |
| `bun run android` | Dev server targeting Android |
| `bun run web` | Dev server targeting Web |
| `bun run clean` | Remove `.expo` and `node_modules` |
| `bun run fix:deps` | Fix dependency versions via Expo |
| `bun run doctor` | Run Expo doctor diagnostics |


## Features

- **Expo Router** — File-based routing with Stack, Drawer, and Tab navigators
- **Uniwind + Tailwind v4** — Runtime CSS-in-JS with `className` props, `cn()` utility, dark mode
- **Zustand** — Lightweight client state with MMKV persistence
- **TanStack Query** — Server state, caching, and auto-refetching
- **TanStack Form + Zod** — Type-safe form validation
- **Axios** — HTTP client with auth token interceptor and refresh queue
- **i18next** — Internationalization (English, French, Arabic) with RTL support
- **MMKV** — High-performance key-value storage
- **Authentication** — Login/register flow with token management, demo mode skip
- **React Navigation** — Deep linking, typed routes
- **Bottom Sheet** — Reusable bottom sheet component via `@rn-primitives/dialog`
- **React Native Reusables** — Accessible, headless UI primitives (Dialog, Portal, Slot)
- **lucide-react-native** — Icon library
- **Dark/Light/System theme** — CSS variables in oklch, persisted preference
- **Cross-platform** — iOS, Android, Web

## Project Structure

```
├── app/                    # Expo Router routes
│   ├── _layout.tsx         # Root layout (providers, stack)
│   ├── (auth)/             # Unauthenticated routes
│   │   └── login.tsx
│   └── (app)/              # Authenticated routes
│       ├── _layout.tsx     # Drawer layout + auth guard
│       ├── settings.tsx
│       └── (tabs)/         # Bottom tabs
│           ├── _layout.tsx
│           ├── index.tsx   # Home
│           ├── search.tsx
│           ├── profile.tsx
│           └── settings.tsx
├── src/
│   ├── api/                # Axios client + TanStack Query hooks
│   ├── components/
│   │   ├── common/         # LoadingScreen, ErrorFallback
│   │   ├── forms/          # FormField
│   │   └── ui/             # Button, Text, BottomSheet
│   ├── config/             # Constants
│   ├── hooks/              # Shared hooks
│   ├── i18n/               # i18next + locales/{en,fr,ar}
│   ├── providers/          # QueryProvider, ThemeProvider
│   ├── screens/            # Screen components
│   ├── storage/            # MMKV wrapper (SSR-safe)
│   ├── store/              # Zustand stores
│   ├── types/              # Type declarations
│   ├── utils/              # Utilities
│   └── validation/         # Zod schemas
├── global.css              # Tailwind v4 + Uniwind entry
├── tsconfig.json
├── metro.config.js
└── package.json
```

## Tech Stack

| Category | Library |
|----------|---------|
| Framework | React 19 + React Native 0.86 |
| Platform | Expo SDK 57 |
| Language | TypeScript (strict) |
| Routing | Expo Router (Stack/Drawer/Tabs) |
| Styling | Tailwind CSS v4 + Uniwind |
| Client State | Zustand 5 |
| Server State | TanStack Query 5 |
| Forms | TanStack Form 1 + Zod 3 |
| Storage | react-native-mmkv 4 |
| i18n | i18next 26 + react-i18next |
| UI | @rn-primitives |
| Icons | lucide-react-native |
| HTTP | Axios |
| Animation | react-native-reanimated + gesture-handler |
| Linting | ESLint 10 + Prettier |
| Git Hooks | Husky 9 + lint-staged |

## Adding Components

```bash
npx @react-native-reusables/cli@latest add <component>
```

Available: `button`, `text`, `card`, `avatar`, `dialog`, `input`, `select`, `tabs`, `switch`, `checkbox`, `radio-group`, `tooltip`, `dropdown-menu`, `popover`, `accordion`, `alert-dialog`, `context-menu`, `hover-card`, `menubar`, `progress`, `separator`, `toggle`, `toggle-group`, `label`, `collapsible`, `aspect-ratio`.

## Learn More

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [Uniwind Docs](https://docs.uniwind.dev/)
- [React Native Reusables](https://reactnativereusables.com)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [TanStack Form](https://tanstack.com/form/latest)
- [Zustand](https://github.com/pmndrs/zustand)
- [i18next](https://www.i18next.com/)

## Deploy

Use [Expo Application Services (EAS)](https://expo.dev/eas) for builds, updates, and submissions.
