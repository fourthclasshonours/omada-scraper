import 'ts-polyfill/lib/es2019-array';

import puppeteer, { Browser } from 'puppeteer';

import * as Sentry from '@sentry/node';
import { readStore, writeStore } from './output';

import fs from 'fs';
import controller from './sources/controller';

const { NODE_ENV, SENTRY_DSN } = process.env;

const isProduction = NODE_ENV === 'production';

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
  });
}

try {
  fs.mkdirSync('traces');
} catch (e) {}

async function writeData(filename: string, data: any) {
  try {
    writeStore(filename, data);
  } catch (e) {
    console.error(e);
    Sentry?.captureException(e);
  }
}

async function scraper() {
  const browser = await puppeteer.launch({
    headless: isProduction,
    defaultViewport: null,
    args: isProduction ? ['--no-sandbox'] : [],
  });

  await writeData('controller.json', await controller(browser));

  await browser.close();
}

scraper()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    Sentry?.captureException(e);
    process.exit(1);
  });
