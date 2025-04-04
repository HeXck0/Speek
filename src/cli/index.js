import { Command } from 'commander';

import { goScanCommand } from './commands/scan.command.js';
import { menuCommand } from './commands/menu.command.js';

const program = new Command();

program 
  .name('Speek')
  .description('SpeedyPeek - minimal, fast data collector.')
  .version('0.1.3');

goScanCommand(program);
menuCommand(program);

program.parse(process.argv);
