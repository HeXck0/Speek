// get .env

import dotenv from 'dotenv';
dotenv.config();

const defaultFilterRegex = /\b(?:https?:\/\/)?(?:www\.)?([\w-]+\.)+[\w]{2,}(\/[^\s]*)?\b/g;

// export config
export const config = {
  defaultLang: process.env.DEFAULT_LANG || 'en',
  defaultOutputPath: process.env.DEFAULT_OUTPUT_PATH || '/output/',
  defaultLogPath: process.env.DEFAULT_LOG_PATH || 'logs/',
  defaultLogCount: process.env.DEFAULT_LOG_COUNT || 100,
  //Defauttimeout: parseInt(process.env.SCRAPER_TIMEOUT || 6000),
  defaultFilterRegex: process.DEFAULT_FILTER_REGEX || defaultFilterRegex, 
  defaultFormat: process.env.EXPORT_FORMAT || 'json',
  defaultWeb: process.env.WEB_TYPE || 'https'
};
