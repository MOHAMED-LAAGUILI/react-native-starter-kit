import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from "expo-router/react-navigation";
import * as React from "react";
import { useColorScheme, useWindowDimensions } from "react-native";
import { Uniwind } from "uniwind";
import { COLOR_PALETTES } from "@/config/color-palettes";
import { useThemeStore } from "@/store/themeStore";

function usePrimaryColor() {
  const themeMode = useThemeStore(s => s.mode);
  const primaryColor = useThemeStore(s => s.primaryColor);

  React.useEffect(() => {
    const palette = COLOR_PALETTES.find(p => p.key === primaryColor);
    if (!palette) return;

    Uniwind.updateCSSVariables("light", palette.light);
    Uniwind.updateCSSVariables("dark", palette.dark);
    Uniwind.setTheme(themeMode);
  }, [primaryColor, themeMode]);
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useThemeStore(s => s.mode);
  const primaryColor = useThemeStore(s => s.primaryColor);
  const systemScheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = React.useState<"light" | "dark">("light");
  const { width } = useWindowDimensions();

  React.useEffect(() => {
    if (themeMode === "system") {
      Uniwind.setTheme("system");
      const scheme = systemScheme === "dark" ? "dark" : "light";
      setCurrentTheme(scheme);
      return;
    }
    Uniwind.setTheme(themeMode);
    setCurrentTheme(themeMode);
  }, [themeMode, systemScheme]);

  usePrimaryColor();

  const palette = COLOR_PALETTES.find(p => p.key === primaryColor);
  const primaryHex = palette?.color ?? "#3b82f6";

  const navTheme = React.useMemo(() => {
    const base = currentTheme === "dark" ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: primaryHex,
      },
    };
  }, [currentTheme, primaryHex]);

  return <NavThemeProvider value={navTheme}>{children}</NavThemeProvider>;
}

export { ThemeProvider };
