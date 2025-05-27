// get .env

import dotenv from 'dotenv';
import {dirname , path} from '#src/utils/get-dirname.js'

const envPath = path.resolve(dirname, '../../.env');

dotenv.config({ path: envPath });


const defaultFilterRegex = /\b(?:https?:\/\/)?(?:www\.)?((?:[\w-]+\.)+[a-z]{2,})(?:\/[^\s"']*)?/gi
;

// export config
export const config = {
  defaultLang: process.env.DEFAULT_LANG || 'en',
  defaultOutputPath: process.env.DEFAULT_OUTPUT_PATH || '/output/',
  defaultLogPath: process.env.DEFAULT_LOG_PATH || 'logs/',
  defaultLogCount: process.env.DEFAULT_LOG_COUNT || 100,
  //Defauttimeout: parseInt(process.env.SCRAPER_TIMEOUT || 6000),
  defaultFilterRegex: process.env.DEFAULT_FILTER_REGEX || defaultFilterRegex,
  defaultMailRegex: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi,
  defaultFormat: process.env.EXPORT_FORMAT || 'json',
  defaultWeb: process.env.WEB_TYPE || 'https',
  defaultDnsServers: (process.env.DNS_SERVERS || '1.1.1.1,8.8.8.8').split(','),
  defaultDnsLimit: (() => {
    const val = Number(process.env.DNS_LIMIT);
    return (!isNaN(val) && val > 0) ? val : 10;
  })()
};
