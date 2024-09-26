import fs from 'node:fs';
import { findNodeModule } from 'import-module-runtime';
import { Command } from './commands/command.interface.js';

const COMMAND_FILE_ENDS = '-command.ts';
const COMMAND_CLASS_ENDS = 'Command';

export class CommandsLoader {
  static load(commandsPath: string): Command[] {
    const commands: Command[] = [];

    const filePaths = fs.readdirSync(commandsPath, { withFileTypes: true });

    const commandFiles = filePaths
      .filter((filePath) => (filePath.isFile() && filePath.name.endsWith(COMMAND_FILE_ENDS)))
      .map((filePath) => filePath.name);

    commandFiles.forEach((commandFile) => {
      const nodeModule = findNodeModule([commandsPath, commandFile].join('/'));

      if (nodeModule) {
        const { exports } = nodeModule;
        const firstExportKey = Object.keys(exports)[0];

        if (firstExportKey && firstExportKey.endsWith(COMMAND_CLASS_ENDS)) {
          const firstModuleExport = exports[Object.keys(exports)[0]];

          commands.push(new firstModuleExport());
        }
      }
    });

    return commands;
  }
}
