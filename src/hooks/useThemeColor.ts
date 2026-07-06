import { useUniwind } from "uniwind";

export function useThemeColors() {
  const { theme } = useUniwind();

  const isDark = theme.startsWith("dark");

  return {
    background: isDark ? "#000" : "#fff",
    border: isDark ? "#3f3f46" : "#d4d4d8",
    icon: isDark ? "#fff" : "#000",
    isDark,
    text: isDark ? "#fff" : "#000",
  };
}
