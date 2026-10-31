import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/side_by_side_fix.png');

  // Let's crop just the middle card ("Fixed with object-cover object-top")
  await page.screenshot({ 
    path: 'screenshots/fixed_object_top_card.png', 
    clip: { x: 440, y: 35, width: 420, height: 320 } 
  });
  
  // Also crop the "Fixed with object-contain"
  await page.screenshot({ 
    path: 'screenshots/fixed_object_contain_card.png', 
    clip: { x: 865, y: 35, width: 420, height: 320 } 
  });

  console.log('Saved fixed_object_top_card.png and fixed_object_contain_card.png');
  await browser.close();
}

main();

