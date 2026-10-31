import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/exact_gallery_test.png');
  
  // Let's inspect Option 1 vs Option 2
  console.log('Opened exact_gallery_test.png');
  await browser.close();
}

main();

