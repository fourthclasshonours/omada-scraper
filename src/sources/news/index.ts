import { Browser } from 'puppeteer';
import { News } from './model';

export default async function news(browser: Browser): Promise<News[]> {
  const page = await browser.newPage();

  await page.goto('https://overwatch.blizzard.com/en-gb/news/');

  const news: News[] = await page.evaluate(() => {
    const results: News[] = [];

    const elements = [...document.querySelectorAll('.news')];

    for (const elem of elements) {
      const imageElement = elem.querySelector('*[slot="image"]');
      const image =
        imageElement != null
          ? `http:${imageElement.getAttribute('src')}`
          : null;

      const dateString = elem.querySelector('.date')?.textContent ?? null;
      const date =
        dateString != null ? new Date(dateString).toISOString() : null;

      const item: News = {
        title: elem.querySelector('h1[slot="heading"]')?.textContent ?? null,
        link: (elem.parentElement as HTMLAnchorElement).href ?? null,
        image,
        summary:
          elem.querySelector('.article-summary')?.textContent?.trim() ?? null,
        date,
      };

      results.push(item);
    }

    return results;
  });

  return news;
}
