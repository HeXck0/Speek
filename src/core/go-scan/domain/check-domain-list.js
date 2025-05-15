import { parse } from 'tldts';
import { config } from '#src/config/index.js';

export const checkDomainList = (urlData) => {
  urlData = urlData.match(config.defaultFilterRegex);
  return [...new Set(
    urlData
      .map(parse)
      .filter(r => r.domain && r.isIcann && !r.isIp)
      .map(r => r.hostname || r.domain)
  )];

}

export default checkDomainList;
