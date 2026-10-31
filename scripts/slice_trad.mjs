import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 814, height: 1020 } });
  await page.goto('http://localhost:5173/images/traditional-flying-kick.jpg');
  
  await page.screenshot({ path: 'screenshots/trad_slice_top.png', clip: { x: 0, y: 0, width: 814, height: 260 } });
  await page.screenshot({ path: 'screenshots/trad_slice_mid.png', clip: { x: 0, y: 260, width: 814, height: 260 } });
  await page.screenshot({ path: 'screenshots/trad_slice_lower.png', clip: { x: 0, y: 520, width: 814, height: 260 } });
  await page.screenshot({ path: 'screenshots/trad_slice_bottom.png', clip: { x: 0, y: 780, width: 814, height: 240 } });
  
  console.log('Saved 4 slices of traditional-flying-kick.jpg');
  await browser.close();
}

main();

