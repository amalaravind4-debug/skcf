import { chromium } from 'playwright';

async function check() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173');
  const imgInfo = await page.evaluate(() => {
    const el = document.querySelector('img[alt*="Flying Kick"]');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const parent = el.parentElement.getBoundingClientRect();
    return {
      nw: el.naturalWidth,
      nh: el.naturalHeight,
      w: rect.width,
      h: rect.height,
      parentW: parent.width,
      parentH: parent.height,
      currentSrc: el.currentSrc
    };
  });
  console.log('Image Info:', imgInfo);
  await browser.close();
}

check();

