import pakageJson from './package.json';

const Env = {
    EXPO_PUBLIC_SLUG: "rn-template",
    EAS_PROJECT_ID: "ab97572d-ff5e-4230-9811-fb36ea521d27",
    EXPO_ACCOUNT_OWNER: "jurvuwfgs-organization",
    EXPO_PUBLIC_NAME: "rn-template",
  EXPO_PUBLIC_VERSION: pakageJson.version,
  EXPO_PUBLIC_SCHEME: "rn-template",
  EXPO_PUBLIC_BUNDLE_ID: "com.rn-template.app",
  EXPO_PUBLIC_PACKAGE: "com.rn-template.app",
} as const;

export default Env;