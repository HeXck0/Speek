//import { goScan } from '';
import ascii from '../../ascii.js';
import { config } from '../../config/config.js';

export const goScanCommand = (program) => {
  program
    .command('go')
    .description('Get the data any domain or domain list')
    .option('-f, --file <path>', 'domain list path', config.defaultFile)
    .option('-t, --type <format>', 'export format: csv/json', config.defaultFormat)
    .action(async (opts) => {
      console.log(ascii);
      console.log('first running', opts);
      //await goScan(opts);
    });
}
