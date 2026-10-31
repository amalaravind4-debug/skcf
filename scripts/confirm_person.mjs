import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1000, height: 600 } });
  await page.setContent(`
    <!DOCTYPE html>
    <html><body style="background:#000; display:flex; gap:20px; padding:20px;">
      <div>
        <h3 style="color:white">traditional-flying-kick.jpg (Full uncropped with head)</h3>
        <img src="http://localhost:5173/images/traditional-flying-kick.jpg" style="height:500px;" />
      </div>
      <div>
        <h3 style="color:white">hero-flying-kick.jpg (Cropped at neck)</h3>
        <img src="http://localhost:5173/images/hero-flying-kick.jpg" style="height:500px;" />
      </div>
    </body></html>
  `);

  await page.screenshot({ path: 'screenshots/confirm_same_person.png' });
  console.log('Saved screenshots/confirm_same_person.png');
  await browser.close();
}

main();

