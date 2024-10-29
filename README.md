## Описание

Этот проект разработан как тестовое задание на позицию Full-Stack разработчика в компанию ILC. 
Сервис периодически получает и отображает в консоли курс валют (USD/RUB и EUR/RUB) с сайта [Investing.com](https://www.investing.com).

### Технические особенности

- Используется `puppeteer-core` для работы с веб-страницей и извлечения данных.
- Поддерживает разные операционные системы (Windows, MacOS, Linux) с автоопределением пути до Chrome.
- Сервис обновляет данные с частотой 1 раз в минуту с использованием `node-cron`.

## Установка и запуск

### Шаги установки

**Клонируйте репозиторий**:
   ```bash
   git clone https://github.com/Tokimikichika/TestWork---full-stack-currency.git
   cd TestWork---full-stack-currency