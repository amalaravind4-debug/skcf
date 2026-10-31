import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/hero_kick_contain.png');
  
  // Inspect the top 60px of the inner image
  const data = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Look at the top center of the contain box
    // Is the top of the purple robe touching the top boundary of the image?
    return {
      w: canvas.width,
      h: canvas.height
    };
  });
  console.log('Contain screenshot size:', data);
  await browser.close();
}

main();

