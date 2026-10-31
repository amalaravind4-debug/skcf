import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();

  // Desktop test (1440x900)
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Hero card screenshot
  const heroImg = await page.$('section:has-text("Shaolin Kung-Fu") img[alt*="Flying Kick"]');
  if (heroImg) {
    await heroImg.screenshot({ path: 'screenshots/verified_desktop_hero_card.png' });
    console.log('Saved verified_desktop_hero_card.png');
  }

  // 2. Scroll to Gallery section
  const gallery = await page.$('section:has-text("VISUAL PROOF & ACTION ARCHIVE")');
  if (gallery) {
    await gallery.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await gallery.screenshot({ path: 'screenshots/verified_desktop_gallery_full.png' });
    console.log('Saved verified_desktop_gallery_full.png');
  }

  // Find all cards with traditional-flying-kick.jpg or flying kick in gallery
  const allKickCards = await page.$$('img[src*="traditional-flying-kick.jpg"]');
  console.log('Found kick cards count on page:', allKickCards.length);
  for (let i = 0; i < allKickCards.length; i++) {
    await allKickCards[i].scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    await allKickCards[i].screenshot({ path: `screenshots/verified_desktop_kick_card_${i}.png` });
    console.log(`Saved verified_desktop_kick_card_${i}.png`);
  }

  // Mobile test (393x852)
  const mobilePage = await browser.newPage({ viewport: { width: 393, height: 852 } });
  await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  // Mobile hero card
  const mobileHeroImg = await mobilePage.$('section:has-text("Shaolin Kung-Fu") img[alt*="Flying Kick"]');
  if (mobileHeroImg) {
    await mobileHeroImg.screenshot({ path: 'screenshots/verified_mobile_hero_card.png' });
    console.log('Saved verified_mobile_hero_card.png');
  }

  // Mobile gallery
  const mobileGallery = await mobilePage.$('section:has-text("VISUAL PROOF & ACTION ARCHIVE")');
  if (mobileGallery) {
    await mobileGallery.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(800);
  }

  const mobileKickCards = await mobilePage.$$('img[src*="traditional-flying-kick.jpg"]');
  for (let i = 0; i < mobileKickCards.length; i++) {
    await mobileKickCards[i].scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(200);
    await mobileKickCards[i].screenshot({ path: `screenshots/verified_mobile_kick_card_${i}.png` });
    console.log(`Saved verified_mobile_kick_card_${i}.png`);
  }

  await browser.close();
  console.log('Verification run completed successfully!');
}

main();

