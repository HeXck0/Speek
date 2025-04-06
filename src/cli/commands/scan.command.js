//import { goScan } from '';
import showLogo from '../../ascii.js';

import { loadDomainList } from '../../services/goScan/checkDomainFile.js';
import { config } from '../../config/config.js';

export const goScanCommand = (program) => {
  program
    .command('go')
    .description('Get the data any domain or domain list')
    .requiredOption('-f, --file <path>', 'domain list path')
    .option('-t, --type <format>', 'export format: csv/json', config.defaultFormat)
    .action(async (opts) => {
      showLogo(); 
      const { file, type } = opts;
      await loadDomainList(file ,type); 
    });
}
