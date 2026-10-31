import { chromium } from 'playwright';

async function verifyTraditionalHead() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 900, height: 1100 } });
  await page.setContent(`
    <html><body style="margin:0; background:#070709; display:flex; justify-content:center; align-items:center; height:100vh;">
      <img src="http://localhost:5173/images/traditional-flying-kick.jpg" style="max-height:90vh; max-width:90vw; border:2px solid red;" />
    </body></html>
  `);
  await page.screenshot({ path: 'screenshots/traditional_kick_with_head.png' });
  console.log('Saved traditional_kick_with_head.png');
  await browser.close();
}

verifyTraditionalHead();

