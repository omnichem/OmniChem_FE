# OmniChem_FE

OmniChem_FE - это React - приложение реализующее интерфейс платформы OmniChem.

## Настройка OmniChem_FE на локальной машине
После клонирования репозитория, выполните в корне приложения команду:
```bash
   cd OmniChem_FE
   ```
```bash
   npm install
   ```

## Переменные окружения для разработки (файл `.env.dev`)

### Настройки Vite

Для правильной работы вашего React-приложения в режиме разработки, убедитесь, что файл `.env` содержит следующие переменные окружения:

- `APP_API_URL`: Установите значение `localhost`а OmniChem-Backend, чтобы приложение смогло взаимодействовать с `API` сервера.

## Использование
### Запуск с Docker

1. Убедитесь, что Docker установлен на вашем компьютере.

2. Клонируйте репозиторий OmniChem_FE:

```bash
   git clone https://github.com/omnichem/OmniChem_FE.git
   ```

3. Перейдите в папку OmniChem_FE:
```bash
   cd OmniChem_FE
   ```

4. Создайте файл `.env` в корне приложения и настройте необходимые переменные окружения:
```bash
   OmniChem_FE/.env
   ```

5. Запустите приложение с использованием Docker Compose:
```bash
   docker-compose up -d
   ```

6. Приложение будет доступно по адресу http://localhost:6688/.
   
### Запуск без Docker

1. Клонируйте репозиторий OmniChem_FE:

```bash
   git clone https://github.com/omnichem/OmniChem_FE.git
   ```

2. Перейдите в папку OmniChem_FE:
```bash
   cd OmniChem_FE
   ```

3. Создайте файл `.env` в корне приложения и настройте необходимые переменные окружения:
```bash
   OmniChem_FE/.env
   ```

4. Запустите приложение с использованием команды:
```bash
   npm run dev
   ```

5. Приложение будет доступно по адресу http://localhost:6688/.
