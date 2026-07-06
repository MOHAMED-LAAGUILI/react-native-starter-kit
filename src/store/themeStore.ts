import { create } from "zustand";
import { STORAGE_KEYS } from "@/config/constants";
import { StorageService } from "@/storage";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  primaryColor: string;
  setMode: (mode: ThemeMode) => void;
  setPrimaryColor: (color: string) => void;
  hydrate: () => void;
}

export const useThemeStore = create<ThemeState>(set => ({
  hydrate: () => {
    try {
      const persisted = StorageService.getString(STORAGE_KEYS.THEME_MODE) as ThemeMode | undefined;
      if (persisted) set({ mode: persisted });
      const persistedColor = StorageService.getString(STORAGE_KEYS.PRIMARY_COLOR);
      if (persistedColor) set({ primaryColor: persistedColor });
    } catch {}
  },
  mode: "system",
  primaryColor: "blue",
  setMode: (mode: ThemeMode) => {
    StorageService.setString(STORAGE_KEYS.THEME_MODE, mode);
    set({ mode });
  },
  setPrimaryColor: (color: string) => {
    StorageService.setString(STORAGE_KEYS.PRIMARY_COLOR, color);
    set({ primaryColor: color });
  },
}));
