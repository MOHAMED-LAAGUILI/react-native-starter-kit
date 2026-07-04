import { Platform } from "react-native";
import { isWeb } from "@/utils/platform";

let storageInstance: ReturnType<typeof createMMKV> | null = null;

function createMMKV() {
  try {
    const mmkv = require("react-native-mmkv");
    return mmkv.createMMKV({
      id: "app-storage",
      //path: `${USER_DIRECTORY}/storage`,
      //encryptionKey: 'hunter2',
      //encryptionType: 'AES-256',
      //mode: 'multi-process',
      //readOnly: false,
      //compareBeforeSet: false,
    });
  } catch (e) {
    return e;
  }
}

function getStorage() {
  if (!storageInstance) {
    storageInstance = createMMKV();
  }
  if (!storageInstance) {
    if (isWeb) {
      try {
        return {
          clearAll: () => localStorage.clear(),
          contains: (key: string) => localStorage.getItem(key) !== null,
          getAllKeys: () => Object.keys(localStorage),
          getBoolean: (key: string) => {
            const v = localStorage.getItem(key);
            return v ? v === "true" : undefined;
          },
          getNumber: (key: string) => {
            const v = localStorage.getItem(key);
            return v ? Number(v) : undefined;
          },
          getString: (key: string) => localStorage.getItem(key) ?? undefined,
          remove: (key: string) => {
            localStorage.removeItem(key);
            return true;
          },
          set: (key: string, value: string | boolean | number) => localStorage.setItem(key, String(value)),
        };
      } catch {
        return null;
      }
    }
    return null;
  }
  return storageInstance;
}

const StorageService = {
  clearAll(): void {
    getStorage()?.clearAll();
  },

  contains(key: string): boolean {
    return getStorage()?.contains(key) ?? false;
  },

  delete(key: string): void {
    getStorage()?.remove(key);
  },

  getBoolean(key: string): boolean | undefined {
    return getStorage()?.getBoolean(key);
  },

  getNumber(key: string): number | undefined {
    return getStorage()?.getNumber(key);
  },

  getObject<T>(key: string): T | undefined {
    const json = getStorage()?.getString(key);
    if (!json) return undefined;
    try {
      return JSON.parse(json) as T;
    } catch {
      return undefined;
    }
  },
  getString(key: string): string | undefined {
    return getStorage()?.getString(key);
  },

  setBoolean(key: string, value: boolean): void {
    getStorage()?.set(key, value);
  },

  setNumber(key: string, value: number): void {
    getStorage()?.set(key, value);
  },

  setObject<T>(key: string, value: T): void {
    getStorage()?.set(key, JSON.stringify(value));
  },

  setString(key: string, value: string): void {
    getStorage()?.set(key, value);
  },
};

export { StorageService };
