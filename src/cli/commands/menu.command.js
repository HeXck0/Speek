import { showRootMenu } from '../menuHandler.js';
import ascii from '../../ascii.js';

export const menuCommand = (program) => {
  program
    .command('menu')
    .description('Open interactive CLI menu')
    .action(async () => {
      console.log(ascii);
      await showRootMenu();
    });
} 
