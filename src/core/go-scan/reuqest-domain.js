// import fs from 'fs';
// import { Agent, request } from 'undici';
// import getUserAgent from './getUserAgent.js';
//
// const keepAliveAgent = new Agent({
//   maxConnections: 100,
//   keepAliveTimeout: 10 * 1000,
//   pipelining: 1,
// });
//
// const langs = [
//   'en-US,en;q=0.9',
//   'tr-TR,tr;q=0.9,en-US;q=0.8',
//   'fr-FR,fr;q=0.9,en;q=0.8',
//   'de-DE,de;q=0.9,en;q=0.8',
//   'es-ES,es;q=0.9,en;q=0.8'
// ];
//
// const cacheControls = ['no-cache', 'max-age=0', 'no-store'];
//
// const getRandomSpec = (spec) => spec[Math.floor(Math.random() * spec.length)];
//
// export const getHttpHeaders = () => {
//   const { userAgent, platform, vendor, appName, viewportWidth, viewportHeight } = getUserAgent.data;
//
//   return {
//     'User-Agent': userAgent,
//     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
//     'Accept-Language': getRandomSpec(langs),
//     'Referer': 'https://www.google.com/',
//     'Connection': 'keep-alive',
//     'Upgrade-Insecure-Requests': '1',
//     'Sec-Fetch-Dest': 'document',
//     'Sec-Fetch-Mode': 'navigate',
//     'Cache-Control': getRandomSpec(cacheControls),
//     'X-Fake-Platform': platform,            
//     'X-Fake-Viewport': `${viewportWidth}x${viewportHeight}`,  
//     'X-Fake-Vendor': vendor
//   };
// }
//
// export const httpReq = async (domain) => {
//   try {
//     const headers = getHttpHeaders(); 
//     console.log('Request Headers:', headers);
//
//     const { statusCode, headers: responseHeaders, body } = await request(domain, {
//       method: 'GET',
//       dispatcher: keepAliveAgent,
//       headers
//     });
//
//     console.log('Status Code:', statusCode);
//
//     if (statusCode >= 400) {
//       console.log('Başarısız istek');
//       return;
//     }
//
//     const html = await body.text();
//     //console.log('HTML:', html);
//
//     const cookies = responseHeaders['set-cookie'];
//     const locations = responseHeaders['location'];
//     console.log("Set-Cookie Headers:", cookies);
//     console.log("Location:", locations);
//
//
//     fs.writeFileSync('./tests.txt', html)
//      // ['Merhaba', 'World', '!']
//
//   } catch (err) {
//     console.error('Hata:', err);
//   }
// }
//
// // https://httpbin.org/cookies/set?name=adana
// httpReq('https://2m2.se/conatct');

