import { isWeb } from "@/utils/platform";

let mmkv: ReturnType<typeof createMMKV> | null = null;

function createMMKV() {
  try {
    const { createMMKV: create } = require("react-native-mmkv");
    return create({ id: "app-storage" });
  } catch {
    return null;
  }
}

function getStorage() {
  if (!mmkv) mmkv = createMMKV();
  return mmkv;
}

function getWebStorage() {
  if (!isWeb) return null;
  try {
    return {
      clearAll: () => localStorage.clear(),
      contains: (key: string) => localStorage.getItem(key) !== null,
      getAllKeys: () => Object.keys(localStorage),
      getString: (key: string) => localStorage.getItem(key),
      remove: (key: string) => localStorage.removeItem(key),
      set: (key: string, value: string) => localStorage.setItem(key, value),
    };
  } catch {
    return null;
  }
}

export const StorageService = {
  clearAll(): void {
    getStorage()?.clearAll();
    getWebStorage()?.clearAll();
  },

  contains(key: string): boolean {
    return getStorage()?.contains(key) ?? getWebStorage()?.contains(key) ?? false;
  },

  getAllKeys(): string[] {
    const nativeKeys = getStorage()?.getAllKeys() ?? [];
    const webKeys = getWebStorage()?.getAllKeys() ?? [];
    const combined = new Set([...nativeKeys, ...webKeys]);
    return [...combined];
  },
  getItem<T>(key: string): T | null {
    const raw = getStorage()?.getString(key) ?? getWebStorage()?.getString(key) ?? null;
    if (raw == null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  },

  removeItem(key: string): void {
    getStorage()?.remove(key);
    getWebStorage()?.remove(key);
  },

  setItem<T>(key: string, value: T): void {
    const json = JSON.stringify(value);
    getStorage()?.set(key, json);
    getWebStorage()?.set(key, json);
  },
};
