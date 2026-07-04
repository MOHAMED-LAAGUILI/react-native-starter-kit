import Constants from "expo-constants";

const runtimeEnv = {
  API_URL: process.env.API_URL ?? Constants.expoConfig?.extra?.apiUrl ?? "http://localhost:3000/api",
  ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS === "true",
  ENABLE_CRASH_REPORTING: process.env.ENABLE_CRASH_REPORTING === "true",
  IS_DEV: __DEV__,
};

const ENV = {
  ...runtimeEnv,
} as const;

export { ENV };
