# Как работать над проектом

## Окружение

Для удобства работы над проектом используются инструменты из **Node.js** и **npm**. Все необходимые настройки произведены. Убедитесь, что на рабочем компьютере установлен актуальный LTS релиз Node.js**. Актуальная версия **Node.js** указана в файле `package.json` в поле `node`. Затем, в терминале, перейдите в директорию с проектом и _единожды_ запустите команду:

```bash
npm install
```

Команда запустит процесс установки зависимостей проекта из **npm**.

## Список всех переменных окружения

HOST=localhost - хост где запущен REST-сервер

PORT=5000      - прот где запущен REST-сервер

SALT=abcdefg   - Соль для хэширования паролей

DB_HOST=127.0.0.1  - IP-адресс СУБД

DB_PORT=27017      - порт СУБД

DB_USER=admin      - имя пользователя СУБД

DB_PASSWORD=test   - пароль пользователя СУБД

DB_NAME=six-cities - имя БД в СУБД

STATIC_DIRECTORY_PATH=./static - директория к статичным файлам

UPLOAD_DIRECTORY=./upload      - директория для сохранения загруженных файлов

JWT_SECRET=qazwsxedc - хэш-строка для подписи токенов

### Запуск проекта

1. запуск REST-сервера:
```bash
npm run start
```

2. запуск фронтенда:
```bash
cd .\frontend\
npm run start
```

После запуска, приложение доступно для просмотра в браузере по адресу [http://localhost:3000](http://localhost:3000).

### Сценарии

В `package.json` предопределено несколько сценариев.

#### Скомпилировать проект

```bash
npm run compile
```

Создаст директорию `dist` и скомпилирует проект.

#### Удалить скомпилированный проект

```bash
npm run clean
```

Удаляет директорию `dist`. Используется перед компиляцией.

#### Собрать проект

```bash
npm run build
```

Выполняет сборку проекта: удаляет ранее скомпилированный проект и компилирует заново.

#### Проверить линтером

```bash
npm run lint
```

Запуск проверки проекта статическим анализатором кода **ESLint**.

Линтер проверяет файлы только внутри директории `src`.

**Обратите внимание**, при запуске данной команды, ошибки выводятся в терминал.

#### Запустить ts-модуль без компиляции

```bash
npm run ts -- <Путь к модулю с ts-кодом>
```

Пакет `ts-node` позволяет выполнить TS-код в Node.js без предварительной компиляции. Используется только на этапе разработки.

#### Запустить проект

```bash
npm start
```

В процессе запуска проекта будет выполнен процесс «Сборки проекта» и запуска результирующего кода.

#### Запустить json-server

```bash
npm mock:server
```

#### Запустить проект в режиме отладки

```bash
npm run start:dev
```

#### Запустить cli-проект

```bash
npm run start:cli
```

#### Запустить cli-проект в режиме отладки

```bash
npm run start:cli:dev
```

#### Запустить cli-проект в режиме отладки с параметром --version

```bash
npm run start:cli:dev:version
```

#### Запустить cli-проект в режиме отладки с параметром --help

```bash
npm run start:cli:dev:help
```

#### Запустить cli-проект в режиме отладки с параметром --none

```bash
npm run start:cli:dev:none
```

#### Запустить cli-проект в режиме отладки с параметром --import ./mocks/offers.tsv admin test localhost 27017 six-cities abcdefg

```bash
npm run start:cli:dev:import
```

#### Запустить cli-проект в режиме отладки с параметром --generate 200 ./mocks/offers.tsv http://localhost:3123/api

```bash
npm run start:cli:dev:generate
```

Запустискает json-server тестового REST API интерфейса.

## Структура проекта

### Директория `src`

Исходный код проекта: компоненты, модули и так далее. Структура директории `src` может быть произвольной.

### Файл `Readme.md`

Инструкции по работе с учебным репозиторием.

### Файл `Contributing.md`

Советы и инструкции по внесению изменений в учебный репозиторий.

### Остальное

Все остальные файлы в проекте являются служебными. Пожалуйста, не удаляйте и не изменяйте их самовольно. Только если того требует задание или наставник.
