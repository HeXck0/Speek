// import fs from 'fs/promises';
// import { config } from '../../config/config.js';
// import { isValidDomain } from './checkDomainList.js';
//
// let urls = [];
// export const loadDomainList = async (filePath, fileExt) => {
//   let fileType = 'json';
//   const domainFilePath = process.cwd() + '/' + filePath;
//   let urlData;
//
//   Json & Csv Distinction
//
//   if (filePath.includes('csv')) { 
//     fileType = 'csv';
//     urlData = await findCsvData(domainFilePath);
//   } else {
//     urlData = await findJsonData(domainFilePath);
//   }
//
//   urlData = await findDomainData(domainFilePath);
//   urlData = isValidDomain(urlData);
//   return urlData; 
// }
//
// findJsonData
// const findDomainData = async (domainFilePath) => {
//   const jsonSTR = await fs.readFile(domainFilePath, 'utf-8');
//   try {
//     urls = [...jsonSTR.matchAll(config.defaultFilterRegex)];
//     const domains = urls.map(m => m[0].toLowerCase().trim());
//     return [...new Set(domains)];
//   } catch (err) {
//     console.log(err);
//   }
// }
//
// const findCsvData = async (domainFilePath) => {
//
// }
