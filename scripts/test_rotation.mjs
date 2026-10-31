import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  
  await page.setContent(`
    <!DOCTYPE html>
    <html><body style="background:#000; display:flex; gap:20px; padding:20px;">
      <div>
        <h3 style="color:white">traditional-flying-kick.jpg (As-is)</h3>
        <img src="http://localhost:5173/images/traditional-flying-kick.jpg" style="height:500px;" />
      </div>
      <div>
        <h3 style="color:white">traditional-flying-kick.jpg (Rotated 180deg)</h3>
        <img src="http://localhost:5173/images/traditional-flying-kick.jpg" style="height:500px; transform: rotate(180deg);" />
      </div>
    </body></html>
  `);

  await page.screenshot({ path: 'screenshots/test_rotation.png' });
  console.log('Saved test_rotation.png');
  await browser.close();
}

main();

