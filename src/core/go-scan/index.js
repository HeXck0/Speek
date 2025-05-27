import loadDomainList from './domain/check-domain-file.js';
import readDomainFile from './domain/read-domain-file.js';
import checkDomainList from './domain/check-domain-list.js';
import checkDnsAndScan from './domain/dns-scanning.js';
//import webReuqests from './domain/web-requests.js';
import getNewLog from '#src/logs/index.js';
import { t } from '#src/utils/i18n.js'

const goScan = async (file, type) => {
  getNewLog('INFO', 'scan', { "file": file, status: "started" })
  console.log(t('scan_mode.scan_mode_started'));
  const domListPath = await loadDomainList(file);
  const readDomList = await readDomainFile(domListPath);
  const checkDomList = checkDomainList(readDomList);
  console.log(checkDomList.length);
  const validDomList = await checkDnsAndScan(checkDomList);
  //await webReuqests(validDomList); 
}

export default goScan;
