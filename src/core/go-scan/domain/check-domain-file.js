import fs from 'fs/promises';
import { userPath, path } from '#src/utils/get-dirname.js';
import { t } from '#src/utils/i18n.js';


export const loadDomainList = async (filePath) => {

  const domainFilePath = path.join(userPath, filePath); 
  try { 
    await fs.access(domainFilePath);
  } catch (err) {
    console.log(t('domain.domain_not_found', { 'file_path': domainFilePath } ));
    process.exit(1);
  }

  return domainFilePath;
}

export default loadDomainList;

