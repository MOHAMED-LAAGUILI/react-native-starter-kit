declare module 'uniwind' {
  import type { ThemeName } from 'uniwind/dist/module/core/types';

  export const Uniwind: {
    setTheme(theme: ThemeName | 'system'): void;
    readonly currentTheme: ThemeName;
    readonly hasAdaptiveThemes: boolean;
    readonly themes: ThemeName[];
  };

  export function useUniwind(): {
    theme: ThemeName;
    hasAdaptiveThemes: boolean;
  };
}
