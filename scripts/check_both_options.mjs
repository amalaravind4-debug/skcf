import { chromium } from 'playwright';

async function checkHeadInBoth() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/screenshots/exact_gallery_test.png');
  
  // Crop option 1 and option 2
  const img = await page.$('body');
  await page.screenshot({ path: 'screenshots/option1_crop.png', clip: { x: 32, y: 32, width: 500, height: 480 } });
  await page.screenshot({ path: 'screenshots/option2_crop.png', clip: { x: 32, y: 530, width: 500, height: 480 } });
  console.log('Saved crops for option 1 and option 2');
  await browser.close();
}

checkHeadInBoth();

