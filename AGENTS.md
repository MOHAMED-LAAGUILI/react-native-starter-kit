# AGENTS.md — React Native Starter Kit

## Project Overview
Production-ready Expo + React Native starter with file-based routing, Tailwind v4 (Uniwind), Zustand, TanStack Query, i18n, auth, and React Native Reusables.

## Commands
| Script | Command |
|--------|---------|
| `bun dev` | `expo start -c` |
| `bun run android` | `expo start -c --android` |
| `bun run ios` | `expo start -c --ios` |
| `bun run web` | `expo start -c --web` |
| `bun run clean` | `rm -rf .expo node_modules` |
| `bun run fix:deps` | `npx expo install --fix` |
| `bun run doctor` | `npx expo-doctor --verbose` |
| `bun lint` | `eslint src/` |
| `bun lint:fix` | `eslint src/ --fix` |
| `bun typecheck` | `tsc --noEmit` |

## Conventions

### Naming
- **Files**: kebab-case (`src/screens/login-screen.tsx`, `components/ui/button.tsx`)
- **Routes**: Expo Router (`_layout.tsx`, `settings.tsx`, `app/(auth)/login.tsx`)
- **Components**: PascalCase (`Button`, `BottomSheet`, `ErrorBoundary`)
- **Functions/vars**: camelCase (`setMode`, `changeLanguage`, `hydrate`)
- **Constants**: UPPER_SNAKE_CASE (`STORAGE_KEYS`, `THEME_OPTIONS`)
- **Store slices**: camelCase with `Store` suffix (`useAuthStore`, `useThemeStore`)

### Exports
- **Page components**: default export (`export default function Screen`)
- **Reusable components**: named export (`export { Button, BottomSheet }`)
- **Utilities**: named export (`export function cn`)
- **Stores**: named export (`export { useAuthStore }`)
- **Types**: `export type { ... }`

### Imports
- `@/` path alias maps to `./src/` (tsconfig paths)
- Absolute imports: `import { cn } from '@/lib/utils'`
- Side-effect CSS: `import '@/global.css'`
- Store selectors for perf: `useAuthStore((s) => s.isAuthenticated)`

### TypeScript
- Strict mode, TSX for components, `.ts` for utilities
- Prefer inline types over redundant interfaces for simple objects
- `React.ComponentProps<typeof Component>` + `React.RefAttributes` for wrapper props

## Tech Stack
| Layer | Library |
|-------|---------|
| Framework | React 19 + React Native 0.86 |
| Platform | Expo SDK 57 |
| Language | TypeScript (strict) |
| Routing | Expo Router (Stack/Drawer/Tabs) |
| Styling | Tailwind v4 + Uniwind + `cn()` (clsx + tailwind-merge) |
| Client State | Zustand 5 (MMKV persistence) |
| Server State | TanStack Query 5 |
| Networking | Axios (auth interceptor, refresh queue) |
| Forms | TanStack Form 1 + Zod 3 |
| Storage | react-native-mmkv 4 (lazy init, SSR-safe) |
| i18n | i18next 26 + react-i18next (EN/FR/AR, RTL) |
| UI Primitives | @rn-primitives 1.5 (Portal, Dialog, Slot, etc.) |
| Icons | lucide-react-native |
| Animation | react-native-reanimated + gesture-handler |
| Lint | ESLint 10 + Prettier |
| Git Hooks | Husky 9 + lint-staged |

## Routing Structure
```
app/
├── _layout.tsx          — Root: ErrorBoundary, GestureHandler, Query, Theme, PortalHost, Stack
├── index.tsx            — Auth redirect (→ login or home)
├── +not-found.tsx       — 404
├── +html.tsx            — Web HTML shell
├── (auth)/
│   ├── _layout.tsx      — Auth stack (no header)
│   └── login.tsx        — Login screen
└── (app)/
    ├── _layout.tsx      — Drawer (Home, Settings) + auth guard
    ├── settings.tsx     — Settings (drawer route)
    └── (tabs)/
        ├── _layout.tsx  — Tabs (Home, Search, Profile, Settings)
        ├── index.tsx    — Home tab
        ├── search.tsx   — Search tab
        ├── profile.tsx  — Profile tab
        └── settings.tsx — Settings tab
```

## File Organization
```
src/
├── api/              — Axios client, typed hooks (useLogin, usePosts, etc.)
├── components/
│   ├── common/       — LoadingScreen, ErrorFallback
│   ├── forms/        — FormField
│   └── ui/           — Button, Text, BottomSheet
├── config/           — Constants, env helpers
├── errors/           — ErrorBoundary, ApiError, NetworkError
├── hooks/            — Shared hooks
├── i18n/             — i18next setup + locales/{en,fr,ar}/
├── logger/           — Structured logger
├── providers/        — QueryProvider, ThemeProvider
├── screens/          — LoginScreen, HomeScreen, SearchScreen, ProfileScreen, SettingsScreen
├── storage/          — MMKV wrapper (lazy, SSR-safe)
├── store/            — Zustand stores (authStore, themeStore)
├── types/            — Global type declarations (uniwind.d.ts)
├── utils/            — cn(), etc.
├── validation/       — Zod schemas (login, register, forgotPassword)
└── lib/              — cn() utility, theme tokens
global.css            — Tailwind v4 entry + CSS vars (oklch light/dark)
```

## State Management
- **Zustand**: Auth tokens/user, theme mode. Persisted via MMKV. Hydrated on app boot.
- **TanStack Query**: Server data with staleTime 5min, gcTime 30min, retry 2.
- **Selectors**: Use arrow selectors for re-render perf: `useAuthStore((s) => s.isAuthenticated)`

## Theme System
- CSS variables in `global.css` (oklch colors, `@variant light` / `@variant dark`)
- `ThemeProvider` syncs Zustand `themeStore.mode` → `Uniwind.setTheme()` + React Navigation theme
- Modes: `light`, `dark`, `system` (follows Appearance)
- Persisted in MMKV via Zustand middleware

## i18n
- 3 languages: English, French, Arabic
- Namespaces: `common`, `auth`
- RTL support (Arabic flips layout)
- Language persisted in MMKV via `StorageService`
- `changeLanguage(lang)` updates i18next + sets RTL via `I18nManager`

## Auth Flow
1. App boots → hydrate auth store from MMKV
2. `RootLayoutInner` → if loading, show splash; else render Stack
3. Auth guard in `(app)/_layout.tsx` → redirects to `/(auth)/login` if not authenticated
4. LoginScreen → `authStore.login()` (demo mode: sets mock token)
5. After login → router replaces to `/(app)/(tabs)`
6. Tokens stored in MMKV, attached via Axios interceptor, refresh queue for 401s

## Component Patterns
- All UI components use `className` + `cn()` for styling with Tailwind classes
- `BottomSheet<T>` — generic bottom sheet built on `Dialog.Root`/`Portal`/`Overlay`/`Content`
- `Button` — variants (primary/secondary/outline/ghost/destructive), sizes (sm/md/lg), loading state
- `Text` — variants (h1-h4, body/large/small, caption, label)

## Important Packages
- `@rn-primitives/*` (v1.5.2) — headless UI (Dialog, Portal, Slot)
- `uniwind` (v1.10) — Tailwind v4 runtime for RN
- `@tanstack/react-query` (v5) — server state + devtools
- `@tanstack/react-form` (v1) + `zod` (v3) — form validation
- `zustand` (v5) — client state with MMKV persist
- `react-native-mmkv` (v4) — fast KV storage
- `i18next` (v26) + `react-i18next` — i18n
- `lucide-react-native` — icons
- `axios` — HTTP client with interceptors
- `expo-haptics` — haptic feedback
- `react-native-reanimated` + `react-native-gesture-handler` — animations

## Notes
- No test framework installed
- `expo-env.d.ts` and `.expo/types/` are auto-generated — do not edit
- `src/types/uniwind.d.ts` patches TypeScript 6 compatibility with uniwind types
- Use `bun` for package management only — don't add `package-lock.json` or `yarn.lock`
