import inquirer from 'inquirer';
//import { goScaN } from './commands/scan.command.js'

export async function showRootMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Please select a chocies',
      choices: [
        { name: 'Start A Scan', value: 'scan' }
      ]
    }
  ]);

  switch (action) {
    case 'scan':
      console.log("scan is running")
      break;
  }
}
