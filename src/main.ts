

/*
Вопросы
  +1. краткий вызов getRandomItems(...) работает зачем дополнтильно указывать тип string?  getRandomItems<string>(...)
  2. а почему OFFER_TYPES не string[] и приходиться [...OFFER_TYPES]
    т.к. export const OFFER_TYPES = ['apartment', 'house', 'room', 'hotel'] as const;  и это не string[], а readonly ['..','..']

  n. импорт без расрирений файлов https://github.com/KlimovAndreyN/six-cities-api/tree/ts%26eslint-no-import-file-extension
      нужно внести несколько настроек в tsconfig
      но линтер всеравно указывает на ошибки, но можно включить игнорирование этого правила
        eslint rules:
        node/file-extension-in-import:
        ОК     import { Command } from './command.interface';
        ERROR  import { CommandParser } from './command-parser';
        ERROR  import { CommandType } from './commands/const';
        т.к. написана такая проверка, если есть какое-то расширение, т.е. '.interface'


Сделать
  + 1. из TSVFileReader выделить OfferParser

*/
