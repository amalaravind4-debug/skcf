import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head><style>body { background: #111; color: #fff; font-family: sans-serif; padding: 20px; }</style></head>
    <body>
      <h2>Comparing Source Images</h2>
      <div style="display:flex; gap:20px; align-items:flex-start;">
        <div>
          <h4>traditional-flying-kick.jpg (media_1793454061391)</h4>
          <img src="file:///C:/Users/Amal Aravind/.gemini/antigravity/brain/fa468976-b1c3-4c62-b1fa-2178140d2808/.user_uploaded/media_1793454061391_fdaf732e.jpg" style="max-height:400px; border:2px solid cyan;" />
        </div>
        <div>
          <h4>hero-flying-kick.jpg / 1000277888.jpg</h4>
          <img src="file:///C:/Users/Amal Aravind/.gemini/antigravity/brain/fa468976-b1c3-4c62-b1fa-2178140d2808/.user_uploaded/media_1793444438972_30f9ce04.jpg" style="max-height:400px; border:2px solid red;" />
        </div>
        <div>
          <h4>User Screenshot (media_1793458887140_cee265b6.jpg)</h4>
          <img src="file:///C:/Users/Amal Aravind/.gemini/antigravity/brain/fa468976-b1c3-4c62-b1fa-2178140d2808/.user_uploaded/media_1793458887140_cee265b6.jpg" style="max-height:400px; border:2px solid yellow;" />
        </div>
        <div>
          <h4>google_original_flying_kick.jpg</h4>
          <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/google_original_flying_kick.jpg" style="max-height:400px; border:2px solid lime;" />
        </div>
      </div>
    </body>
    </html>
  `);
  
  await page.screenshot({ path: 'screenshots/sources_comparison.png' });
  console.log('Saved screenshots/sources_comparison.png');
  await browser.close();
}

main();
