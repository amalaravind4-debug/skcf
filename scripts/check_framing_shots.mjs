import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/test_framing_options.png');

  // Let's check Option B vs Option C vs Option D
  // In traditional-flying-kick:
  // Head is hair (dark) + face (skin) around top of the person
  // Kick foot is at left or bottom
  // Let's check Option B (x=380..740, y=80..340)
  // Let's check Option C (x=760..1120, y=80..340)
  
  await page.screenshot({ path: 'screenshots/shot_option_b.png', clip: { x: 380, y: 70, width: 370, height: 280 } });
  await page.screenshot({ path: 'screenshots/shot_option_c.png', clip: { x: 750, y: 70, width: 370, height: 280 } });
  await page.screenshot({ path: 'screenshots/shot_option_d.png', clip: { x: 30, y: 380, width: 370, height: 280 } });
  
  console.log('Saved shot_option_b.png, shot_option_c.png, shot_option_d.png');
  await browser.close();
}

main();

