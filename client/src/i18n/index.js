import { createI18n } from 'vue-i18n'
import {pl} from './pl.js';
import {en} from './en.js';

const messages = {
  pl,
  en
}

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'pl',
  messages
})

