import { chromium } from 'playwright';

async function checkGoogleHead() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/screenshots/google_original_flying_kick.jpg');
  
  // Crop the top half: x=0..3072, y=0..2000
  await page.screenshot({ 
    path: 'screenshots/google_orig_top_half.png',
    clip: { x: 0, y: 0, width: 1200, height: 900 }
  });
  console.log('Saved google_orig_top_half.png');
  await browser.close();
}

checkGoogleHead();

