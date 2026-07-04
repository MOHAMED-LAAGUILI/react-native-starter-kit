import { create } from "zustand";
import { STORAGE_KEYS } from "@/config/constants";
import { StorageService } from "@/storage";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  hydrate: () => void;
}

export const useThemeStore = create<ThemeState>(set => ({
  hydrate: () => {
    try {
      const persisted = StorageService.getString(STORAGE_KEYS.THEME_MODE) as ThemeMode | undefined;
      if (persisted) set({ mode: persisted });
    } catch {}
  },
  mode: "system",
  setMode: (mode: ThemeMode) => {
    StorageService.setString(STORAGE_KEYS.THEME_MODE, mode);
    set({ mode });
  },
}));
