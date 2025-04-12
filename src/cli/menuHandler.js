import { t } from '#src/utils/i18n.js';
import inquirer from 'inquirer';

import { config } from '#src/config/index.js';

export async function showRootMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: t("menu.scan_message"),
      choices: [
        { name: t("menu.scan_mode"), value: 'scan' },
        { name:  t("menu.exit_scan"), value: 'exit' }
      ]
    }
  ]);

  switch (action) {
    case 'scan':
      const actionScan = await inquirer.prompt([
        {
          type: 'input',
          name: 'file',
          message: t("menu.domain_path"),
        },
        {
          type: 'list',
          name: 'type',
          message: t("menu.output_format"),
          choices: ['json', 'csv'],
          default: config.defaultFormat
        }
      ]);
      const { file, type } = actionScan;
      break;
    case 'exit':
      process.exit(0);
  }
}
