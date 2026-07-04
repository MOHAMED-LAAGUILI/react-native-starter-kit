import { DarkTheme, DefaultTheme, ThemeProvider as NavThemeProvider } from "expo-router/react-navigation";
import * as React from "react";
import { useColorScheme } from "react-native";
import { Uniwind } from "uniwind";
import { useThemeStore } from "@/store/themeStore";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useThemeStore(s => s.mode);
  const systemScheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = React.useState<"light" | "dark">("light");

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

  const navTheme = React.useMemo(() => {
    const base = currentTheme === "dark" ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        primary: currentTheme === "dark" ? "#3B82F6" : "#2563EB",
      },
    };
  }, [currentTheme]);

  return <NavThemeProvider value={navTheme}>{children}</NavThemeProvider>;
}

export { ThemeProvider };
