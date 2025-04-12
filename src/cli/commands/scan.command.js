import { config } from '#src/config/index.js';
import goScan from '#src/core/go-scan/index.js'

import showLogo from '#src/utils/ascii.js';


export const goScanCommand = (program) => {
  program
    .command('go')
    .description('Get the data any domain or domain list')
    .requiredOption('-f, --file <path>', 'domain list path')
    .option('-t, --type <format>', 'export format: csv/json', config.defaultFormat)
    .action(async (opts) => {
      showLogo(); 
      const { file, type } = opts;
      await goScan();
    });
}
