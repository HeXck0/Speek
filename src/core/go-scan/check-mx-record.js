import dns from 'dns';

export const checkMxRecord = async (domainList) => {
  const validDomains = [];
  for (const domain of domainList) {
    try {
      const mxRecord = await dns.promises.resolveMx(domain);
      if (mxRecord.length > 0) {
        validDomains.push(domain);
      }
    } catch (err) {
      console.log(`MX kaydı yok ${err}`);
    }
  }
  return validDomains;
}
