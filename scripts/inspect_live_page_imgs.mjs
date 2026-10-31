import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);

  // Capture Hero card
  const heroCard = await page.$('section:has-text("Shaolin Kung-Fu") img[alt*="Flying Kick"]');
  if (heroCard) {
    await heroCard.screenshot({ path: 'screenshots/current_hero_flying_kick.png' });
    console.log('Saved current_hero_flying_kick.png');
  } else {
    console.log('Hero flying kick card not found');
  }

  // Scroll down to the gallery
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.6));
  await page.waitForTimeout(1000);

  // Find gallery card with flying kick
  const allImages = await page.$$('img');
  console.log('Total images found on page:', allImages.length);
  for (let i = 0; i < allImages.length; i++) {
    const src = await allImages[i].getAttribute('src');
    if (src && (src.includes('flying-kick') || src.includes('traditional'))) {
      await allImages[i].scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await allImages[i].screenshot({ path: `screenshots/live_flying_img_${i}.png` });
      console.log(`Saved live_flying_img_${i}.png for src: ${src}`);
    }
  }

  await browser.close();
}

main();
