import { parse } from 'tldts';

export const isValidDomain = (urlData) => {
  return [...new Set(
    urlData
      .map(parse)
      .filter(r => r.domain && r.isIcann && !r.isIp)
      .map(r => r.domain)
  )];

}
