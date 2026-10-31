import { chromium } from 'playwright';

async function previewGoogle() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 800, height: 1000 } });
  await page.setContent(`
    <html><body style="margin:0; background:#222; display:flex; justify-content:center; align-items:center;">
      <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/google_original_flying_kick.jpg" style="max-height: 95vh; max-width: 95vw; object-contain;" />
    </body></html>
  `);
  await page.screenshot({ path: 'screenshots/google_orig_scaled_fit.png' });
  console.log('Saved google_orig_scaled_fit.png');
  await browser.close();
}

previewGoogle();

