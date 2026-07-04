import { StorageService } from '@/storage';
import { STORAGE_KEYS } from '@/config/constants';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager, NativeModules, Platform } from 'react-native';
import RNRestart from 'react-native-restart';

import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import frCommon from './locales/fr/common.json';
import frAuth from './locales/fr/auth.json';
import arCommon from './locales/ar/common.json';
import arAuth from './locales/ar/auth.json';

const resources = {
  en: { common: enCommon, auth: enAuth },
  fr: { common: frCommon, auth: frAuth },
  ar: { common: arCommon, auth: arAuth },
};

function getDeviceLanguage(): string {
  try {
    let locale = 'en';
    if (Platform.OS === 'ios') {
      locale = NativeModules.SettingsManager?.settings?.AppleLocale
        ?? NativeModules.SettingsManager?.settings?.AppleLanguages?.[0]
        ?? 'en';
    } else if (Platform.OS === 'android') {
      locale = NativeModules.I18nManager?.localeIdentifier ?? 'en';
    }
    return locale.split('-')[0] ?? 'en';
  } catch {
    return 'en';
  }
}

export function changeLanguage(lang: string): void {
  try {
    StorageService.setString(STORAGE_KEYS.LANGUAGE, lang);
  } catch {}

  i18next.changeLanguage(lang);

  const isRTL = lang === 'ar';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    RNRestart.restart();
  }
}

export async function setupI18n(): Promise<void> {
  let initialLanguage = getDeviceLanguage();

  try {
    const persisted = StorageService.getString(STORAGE_KEYS.LANGUAGE);
    if (persisted) initialLanguage = persisted;
  } catch {}

  const isRTL = initialLanguage === 'ar';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
  }

  await i18next.use(initReactI18next).init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'en',
    ns: ['common', 'auth'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    compatibilityJSON: 'v4',
  });
}

export default i18next;
