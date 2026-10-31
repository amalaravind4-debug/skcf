import { chromium } from 'playwright';

async function checkHeadPresence() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(`
    <html>
      <body style="margin:0; background: yellow;">
        <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" style="width: 1024px; height: 768px; display: block;" />
      </body>
    </html>
  `);
  await page.screenshot({ path: 'screenshots/raw_full_hero_flying_kick.png' });
  console.log('Saved raw_full_hero_flying_kick.png');
  await browser.close();
}

checkHeadPresence();

