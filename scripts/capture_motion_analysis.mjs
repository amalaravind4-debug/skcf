import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();

  // Test 1: Mobile viewport (e.g. iPhone 14 Pro: 393 x 852)
  console.log('Testing Mobile Viewport (393x852)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const sections = ['hero', 'lineage', 'disciplines', 'gallery', 'schedule', 'reviews', 'enquiry'];

  for (const id of sections) {
    const el = await mobilePage.$(`#${id}`);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await mobilePage.waitForTimeout(600);
      await mobilePage.screenshot({ path: `screenshots/mobile_${id}.png` });
      console.log(`Saved screenshots/mobile_${id}.png`);
    }
  }

  // Test 2: Desktop viewport (1440 x 900)
  console.log('Testing Desktop Viewport (1440x900)...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);

  for (const id of sections) {
    const el = await desktopPage.$(`#${id}`);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await desktopPage.waitForTimeout(600);
      await desktopPage.screenshot({ path: `screenshots/desktop_${id}.png` });
      console.log(`Saved screenshots/desktop_${id}.png`);
    }
  }

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

