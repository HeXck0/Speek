import { showRootMenu } from '../menuHandler.js';
import showLogo from '../../ascii.js';

export const menuCommand = (program) => {
  program
    .command('menu')
    .description('Open interactive CLI menu')
    .action(async () => {
      showLogo();
      await showRootMenu();
    });
} 
