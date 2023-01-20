# omada-scraper
[![Run](https://github.com/fourthclasshonours/omada-scraper/actions/workflows/run.yml/badge.svg)](https://github.com/fourthclasshonours/omada-scraper/actions/workflows/run.yml)

Scripts to scrape data for the Omada network system.

For now, it supports:

| Feature                       |                                               |
|-------------------------------|-----------------------------------------------|
| Controller release changelogs | [index.ts](./src/sources/controller/index.ts) |

### Development
1. Run `yarn install`
3. Run `yarn dev:scrape` to start the scraper. In non-production environments, this will launch Chromium.
  Adjust `scraper.ts` accordingly for testing purposes (e.g. disable other sources in order to save time)
