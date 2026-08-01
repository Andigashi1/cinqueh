import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['it'],
  defaultLocale: 'it',
  localePrefix: 'as-needed', // 'it' stays at root URLs; adding 'en' later won't break existing URLs
});