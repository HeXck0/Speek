import fs from 'fs';
import { t } from '#src/utils/i18n.js'

const readDomainFile = async (domListPath) => {

  const stream = fs.createReadStream(domListPath);


  let buffer = '';
 
  try {
    for await (const chunk of stream) {
      buffer += chunk
    }
  } catch (err) {
    console.log(t('log.broken_file'));
    process.exit(1);
  }

  return buffer;
}

export default readDomainFile; 
