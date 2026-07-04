import '../global.css';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { PortalHost } from '@rn-primitives/portal';
import { QueryProvider } from '@/providers/QueryProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { useAuthStore, useThemeStore } from '@/store';
import { setupI18n } from '@/i18n';
import { ErrorBoundary } from '@/errors/ErrorBoundary';
import { LoadingScreen } from '@/components/common/LoadingScreen';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

function RootLayoutInner({ onReady }: { onReady: () => void }) {
  const isLoading = useAuthStore((s) => s.isLoading);
  const hydrate = useAuthStore((s) => s.hydrate);
  const themeHydrate = useThemeStore((s) => s.hydrate);
  const themeMode = useThemeStore((s) => s.mode);
  const readyRef = useRef(false);

  useEffect(() => {
    hydrate();
    themeHydrate();
  }, [hydrate, themeHydrate]);

  useEffect(() => {
    if (!isLoading && !readyRef.current) {
      readyRef.current = true;
      onReady();
    }
  }, [isLoading, onReady]);

  useEffect(() => {
    const bg = themeMode === 'dark' ? '#000000' : '#ffffff';
    SystemUI.setBackgroundColorAsync(bg);
  }, [themeMode]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);

  const onReady = useCallback(() => {
    setAppReady(true);
  }, []);

  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    setupI18n().then(() => setI18nReady(true));
  }, []);

  useEffect(() => {
    if (i18nReady && appReady) {
      SplashScreen.hideAsync();
    }
  }, [i18nReady, appReady]);

  if (!i18nReady) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.root}>
        <QueryProvider>
          <ThemeProvider>
            <RootLayoutInner onReady={onReady} />
            <PortalHost />
          </ThemeProvider>
        </QueryProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
