import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1000, height: 1200 } });
  
  await page.setContent(`
    <html><body style="margin:0; background:#111; display:flex; justify-content:center; align-items:center; height:100vh;">
      <div style="position:relative; border:2px solid cyan;">
        <img src="http://localhost:5173/images/traditional-flying-kick.jpg" style="height:900px; display:block;" />
      </div>
    </body></html>
  `);

  await page.screenshot({ path: 'screenshots/trad_flying_kick_uncropped.png' });
  console.log('Saved trad_flying_kick_uncropped.png');
  await browser.close();
}

main();

