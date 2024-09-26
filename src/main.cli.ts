#!/usr/bin/env node
import { CLIApplication } from './cli/index.js';
import { CommandsLoader } from './cli/commands-loader.js';
import { getErrorMessage } from './shared/helpers/common.js';

const PATH_COMMANDS = './src/cli/commands';

function bootstrap() {
  const cliApplication = new CLIApplication();

  try {
    cliApplication.registerCommands(CommandsLoader.load(PATH_COMMANDS));
    cliApplication.processCommand(process.argv);
  } catch (error) {
    console.log(getErrorMessage(error));
  }
}

bootstrap();
