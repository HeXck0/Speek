import { config } from '#src/config/index.js';
import fs from 'fs';
import dns2 from 'dns2'
import pLimit from 'p-limit'
import { t } from '#src/utils/i18n.js';

const { TCPClient } = dns2;
const dnsServers = config.defaultDnsServers;

let dnsIndex = 0;
const getNextDnsServer = () => {
  const server = dnsServers[dnsIndex];
  dnsIndex = (dnsIndex + 1) % dnsServers.length;

  const client = TCPClient({
    dns: server
  });

  client._usedServer = server;
  return client;
};

const chunkArr = (domList, size=config.defaultDnsLimit) => {
  const chunkedDomList = [];
  for (let i = 0; i < domList.length; i += size) {
    chunkedDomList.push(domList.slice(i, i + size)); 
  }
  return chunkedDomList;
}

const checkDnsValidity = async (dom, dns) => {
  try {

    const ipv4DomArr = await dns(dom);
    const resolvedIP = ipv4DomArr.answers.findLast(a => a.type === 1)?.address;
    const domainName = ipv4DomArr.questions?.[0]?.name || dom;

    if (ipv4DomArr.header.rcode === 3) {
      console.log(t('domain.invalid_domain_name', { 'domain_name': domainName } ));
    } else if (ipv4DomArr.header.rcode === 0 && ipv4DomArr.answers.length === 0) {
      console.log(t('domain.valid_but_no_a', { 'domain_name': domainName } ));
    } else if (!resolvedIP) {
      console.log(t('domain.cname_not_resolved', { 'domain_name': domainName } ));
    } else {
      console.log(t('domain.ip_resolved', { 'domain_name': domainName } ));
      return ipv4DomArr.questions?.[0]?.name || null;
    }

  } catch (err) {
    if (err.code === 'ETIMEOUT' || err.message.includes('timeout')) {
      console.log(t('domain.ip_resolved'));
      return null;
    } else {
      console.log(t('domain.unexcepted_dns_error'));
    }
  }

};

const checkDnsAndScan = async (domList) => {
  const limit = pLimit(config.defaultDnsLimit);
  const chunkedDom = chunkArr(domList);

  const validDomData = []
  for (const chunk of chunkedDom) {  
    const domJobs = chunk.map(dom => {
      return limit(async () => {
        const dns = getNextDnsServer();
        let domData = await checkDnsValidity(dom, dns); 
        return domData 
      })
    })

    let results = await Promise.all(domJobs);
    validDomData.push(...results); 
  }
  return validDomData;
  //fs.writeFileSync('./deneme.json', JSON.stringify(chunkArr(domList), null, 2));
}

export default checkDnsAndScan;
