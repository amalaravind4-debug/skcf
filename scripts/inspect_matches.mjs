import { chromium } from 'playwright';

async function inspectMatches() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  await page.setContent(`
    <html><body style="background:#111; color:white; display:flex; gap:20px; padding:20px;">
      <div>
        <h3>google-maps-2.jpg</h3>
        <img src="http://localhost:5173/images/google-maps-2.jpg" style="height:350px; object-fit:contain;" />
      </div>
      <div>
        <h3>google-maps-3.jpg</h3>
        <img src="http://localhost:5173/images/google-maps-3.jpg" style="height:350px; object-fit:contain;" />
      </div>
      <div>
        <h3>traditional-flying-kick.jpg</h3>
        <img src="http://localhost:5173/images/traditional-flying-kick.jpg" style="height:350px; object-fit:contain;" />
      </div>
      <div>
        <h3>traditional-staff-stance.jpg</h3>
        <img src="http://localhost:5173/images/traditional-staff-stance.jpg" style="height:350px; object-fit:contain;" />
      </div>
    </body></html>
  `);

  await page.screenshot({ path: 'screenshots/inspect_matches.png', fullPage: true });
  console.log('Saved inspect_matches.png');
  await browser.close();
}

inspectMatches();

