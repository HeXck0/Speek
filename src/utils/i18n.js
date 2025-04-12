import fs from 'fs';
import path from 'path';

import { config } from '#src/config/index.js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const appLang =  config.defaultLang;
let appTranslations = {};

export const loadLanguage = (appLang) => { 
  try {
    const filePath = path.join(__dirname, '../i18n', `${appLang}.json`);
    const raw = fs.readFileSync(filePath, 'utf-8');
    appTranslations = JSON.parse(raw);

  } catch(err) {
    console.error(`Language file for ${appLang} not found. Falling back to english`);
    loadLanguage('en');
  }
}


export const t = (key, vars= {}) => {
  const keys = key.split(".");
  let text = keys.reduce((obj, k) => obj?.[k], appTranslations) || key;

  for (const [k, v] of Object.entries(vars)) {
    text = text.replace(`{{${k}}}`, v);
  }
  return text;
}

loadLanguage(appLang);
