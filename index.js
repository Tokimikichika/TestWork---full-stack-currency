const puppeteer = require('puppeteer-core');
const cron = require('node-cron');
const os = require('os');

function getBrowserPath() {
  switch (os.platform()) {
    case 'win32':
      return 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
    case 'darwin':
      return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    case 'linux':
      return '/usr/bin/google-chrome' || '/usr/bin/chromium';
    default:
      throw new Error('Unsupported platform');
  }
}

const currencyPairs = [
  {
    name: 'USD/RUB',
    url: 'https://www.investing.com/currencies/usd-rub-chart',
    selector: 'div[data-test="instrument-price-last"]',
  },
  {
    name: 'EUR/RUB',
    url: 'https://ru.investing.com/currencies/eur-rub',
    selector: 'div[data-test="instrument-price-last"]',
  },
  {
    name: 'EUR/USD',
    url: 'https://ru.investing.com/currencies/eur-usd',
    selector: 'div[data-test="instrument-price-last"]',
  },
  {
    name: 'USD/JPY',
    url: 'https://ru.investing.com/currencies/usd-jpy',
    selector: 'div[data-test="instrument-price-last"]',
  },
  {
    name: 'GBP/USD',
    url: 'https://ru.investing.com/currencies/gbp-usd',
    selector: 'div[data-test="instrument-price-last"]',
  },
];

async function fetchExchangeRates() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: getBrowserPath(),
    });

    for (const pair of currencyPairs) {
      const page = await browser.newPage();

      await page.goto(pair.url, {
        waitUntil: 'networkidle2',
        timeout: 60000,
      });

      await page.waitForSelector(pair.selector, {
        timeout: 10000,
      });

      const exchangeRate = await page.$eval(pair.selector, (element) => element.textContent.trim());

      console.log(`Текущий курс ${pair.name}: ${exchangeRate}`);
      await page.close();
    }

    await browser.close();
  } catch (error) {
    console.error('Ошибка при получении данных:', error.message);
  }
}

console.log('Сервис запущен. Получение курсов валют каждую минуту...');

fetchExchangeRates();

cron.schedule('* * * * *', fetchExchangeRates);
