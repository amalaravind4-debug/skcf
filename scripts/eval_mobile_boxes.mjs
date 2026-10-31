import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/mobile_options_detail.png');

  for (const id of ['#c1', '#c2', '#c3']) {
    const box = await page.locator(id).boundingBox();
    const clip = { x: box.x, y: box.y, width: box.width, height: box.height };
    await page.screenshot({ path: `screenshots/mobile_${id.slice(1)}.png`, clip });
    
    // Evaluate head in this clip
    const headData = await page.evaluate((b) => {
      const canvas = document.createElement('canvas');
      canvas.width = b.width; canvas.height = b.height;
      const ctx = canvas.getContext('2d');
      // sample from image
      // Let's get hair and foot
      return { w: b.width, h: b.height };
    }, clip);
    console.log(id, headData);
  }

  await browser.close();
}

main();

