import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/gallery_row_comparison.png');

  // Let's crop just card 10 from top row (object-cover object-top)
  // and card 10 from bottom row (object-contain)
  await page.screenshot({
    path: 'screenshots/card10_object_top.png',
    clip: { x: 420, y: 70, width: 370, height: 270 }
  });

  await page.screenshot({
    path: 'screenshots/card10_object_contain.png',
    clip: { x: 420, y: 390, width: 370, height: 270 }
  });

  console.log('Saved card10_object_top.png and card10_object_contain.png');
  await browser.close();
}

main();

