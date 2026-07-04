import { readFileSync } from 'fs';

import type { ConfigContext, ExpoConfig } from '@expo/config';

import type { AppIconBadgeConfig } from 'app-icon-badge/types';

import 'tsx/cjs';

const EXPO_PUBLIC_VERSION = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8')).version;

const EXPO_PUBLIC_APP_ENV = process.env.EXPO_PUBLIC_APP_ENV ?? 'development';
const EXPO_PUBLIC_NAME = 'Starter Kit';
const EXPO_PUBLIC_SCHEME = 'starterkit';
const EXPO_PUBLIC_SLUG = 'starter-kit';
const EXPO_ACCOUNT_OWNER = 'obytes';
const EAS_PROJECT_ID = 'c3e1075b-6fe7-4686-aa49-35b46a229044';

const BUNDLE_IDS: Record<string, string> = {
  development: 'com.starterkit.dev',
  preview: 'com.starterkit.preview',
  production: 'com.starterkit',
};

const PACKAGES: Record<string, string> = {
  development: 'com.starterkit.dev',
  preview: 'com.starterkit.preview',
  production: 'com.starterkit',
};

const appIconBadgeConfig: AppIconBadgeConfig = {
  enabled: EXPO_PUBLIC_APP_ENV !== 'production',
  badges: [
    {
      text: EXPO_PUBLIC_APP_ENV,
      type: 'banner',
      color: 'white',
    },
    {
      text: EXPO_PUBLIC_VERSION,
      type: 'ribbon',
      color: 'white',
    },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: EXPO_PUBLIC_NAME,
  slug: EXPO_PUBLIC_SLUG,
  version: EXPO_PUBLIC_VERSION,
  description: `${EXPO_PUBLIC_NAME} Mobile App`,
  owner: EXPO_ACCOUNT_OWNER,
  scheme: EXPO_PUBLIC_SCHEME,
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'automatic',
  backgroundColor: '#ffffff',
  // @ts-expect-error - newArchEnabled is valid in Expo SDK 57
  newArchEnabled: true,
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: BUNDLE_IDS[EXPO_PUBLIC_APP_ENV] ?? BUNDLE_IDS.development,
    backgroundColor: '#ffffff',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    userInterfaceStyle: 'light',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#2E3C4B',
    },
    package: PACKAGES[EXPO_PUBLIC_APP_ENV] ?? PACKAGES.development,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-system-ui',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#2E3C4B',
        image: './assets/images/splash.png',
        resizeMode: 'contain',
        imageWidth: 150,
      },
    ],
    [
      'expo-font',
      {
        ios: {
          fonts: [
            'node_modules/@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf',
            'node_modules/@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf',
            'node_modules/@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf',
            'node_modules/@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf',
          ],
        },
        android: {
          fonts: [
            {
              fontFamily: 'Inter',
              fontDefinitions: [
                {
                  path: 'node_modules/@expo-google-fonts/inter/400Regular/Inter_400Regular.ttf',
                  weight: 400,
                },
                {
                  path: 'node_modules/@expo-google-fonts/inter/500Medium/Inter_500Medium.ttf',
                  weight: 500,
                },
                {
                  path: 'node_modules/@expo-google-fonts/inter/600SemiBold/Inter_600SemiBold.ttf',
                  weight: 600,
                },
                {
                  path: 'node_modules/@expo-google-fonts/inter/700Bold/Inter_700Bold.ttf',
                  weight: 700,
                },
              ],
            },
          ],
        },
      },
    ],
    'expo-localization',
    'expo-router',
    ['app-icon-badge', appIconBadgeConfig],
    ['react-native-edge-to-edge'],
    'expo-status-bar',
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: EAS_PROJECT_ID,
    },
  },
});
