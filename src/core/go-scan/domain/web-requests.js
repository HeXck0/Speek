import { Agent, request } from 'undici';
import getUserAgent from '#src/core/go-scan/get-user-agent.js';
import { config } from '#src/config/index.js';
import * as cheerio from 'cheerio';
import fs from 'fs';


const reqAgent = new Agent({
  maxConnections: config.defaultDnsLimit * 1.5,
  keepAliveTimeout: 10 * 1000,
  pipelining: 1,
});

const getRandomSpec = (spec) => spec[Math.floor(Math.random() * spec.length)];

const getPlatformFromUA = (uaString) => {
  const insideParens = uaString.match(/\(([^)]+)\)/); // parantez içi
  if (!insideParens) return "Unknown";

  const parts = insideParens[1].split(";").map(s => s.trim());

  const platforms = ["Windows", "Mac OS X", "Android", "Linux", "iPhone", "iPad"];
  for (const platform of platforms) {
    const match = parts.find(part => part.includes(platform));
    if (match) return platform;
  }

  return "Unknown";
}


const getSecCHUA = (uaString) => {
  const chromeMatch = uaString.match(/Chrome\/(\d+)\./);
  const version = chromeMatch ? chromeMatch[1] : "120";
  return `"Chromium";v="${version}", "Not:A-Brand";v="99"`;
}

const isMobileUa = (uaString) => uaString.toLowerCase().includes("mobile");

const getSecCHHeadersFromUA = (uaString) => {
  return {
    "Sec-CH-UA": getSecCHUA(uaString),
    "Sec-CH-UA-Platform": `"${getPlatformFromUA(uaString)}"`,
    "Sec-CH-UA-Mobile": isMobileUa(uaString) ? "?1" : "?0",
  };
}


const getSystemAcceptLanguage = () => {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  return `${locale}, ${locale.split('-')[0]};q=0.9,en-US;q=0.8`;
}

const getHttpHeaders = () => {

  const {
    userAgent
  } = getUserAgent.data;

  const cacheControls = ['no-cache', 'max-age=0', 'no-store'];

  return {
    'User-Agent': userAgent,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': getSystemAcceptLanguage(),
    //'Accept-Encoding': 'gzip, deflate, br',
    'Referer': 'https://www.google.com/',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Cache-Control': getRandomSpec(cacheControls),
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'cross-site',
    'DNT': '1',
    ...getSecCHHeadersFromUA(userAgent),
  }
}

// const extractOwnDomainLinks = (html, currentUrl) => {
//   const hrefRegex = /href\s*=\s*["']([^"'<>]+)["']/gi;
//   const matches = [...html.matchAll(hrefRegex)];
//
//   const base = new URL(currentUrl);
//   const baseDomain = base.hostname;
//
//   const result = matches
//     .map(match => match[1])
//     .map(href => {
//       try {
//         return new URL(href, base).toString();
//       } catch {
//         return null;
//       }
//     })
//     .filter(Boolean)
//     .filter(url => {
//       const u = new URL(url);
//       return u.hostname === baseDomain || u.hostname === `www.${baseDomain}`;
//     });
//
//   return [...new Set(result)];
// }

const webRequests = async (domData) => {
  const http = domData.startsWith('http') ? '' : 'http://';
  const url = (http + domData).trim();
  console.log(url)
  const headers = getHttpHeaders();
  const res = await request(url, {
    method: 'GET',
    dispatcher: reqAgent,
    headers
  });

  if ([301, 302, 307, 308].includes(res.statusCode)) {
    const redirectedTo = res.headers.location;
    const absoluteUrl = new URL(redirectedTo, url).toString();
    return await webRequests(absoluteUrl);
  }

  console.log(res.statusCode)
  if (res.statusCode === 200) {
    const html = await res.body.text();
    fs.writeFileSync('./tests.txt', html)
    //let links = extractOwnDomainLinks(html, url);
    //const $ = cheerio.load(html); // html: body.text() içeriği
    //const anchors = $("a"); // Tüm <a> etiketlerini alır
    const data = html.match(config.defaultMailRegex);
    console.log(data)
    //anchors.each((_, el) => {
    //const href = $(el).attr("href");
    //console.log(href);
    //});

  }

}

export default webRequests;
