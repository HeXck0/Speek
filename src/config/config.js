// get .env
import dotenv from 'dotenv';
dotenv.config();

// export config
export const config = {
  defaultLang: process.env.DEFAULT_LANG || 'en',
  defaultFile: process.env.DEFAULT_FILE || 'domains.txt',
  //Defauttimeout: parseInt(process.env.SCRAPER_TIMEOUT || 6000),
  defaultFormat: process.env.EXPORT_FORMAT || 'json'
};
