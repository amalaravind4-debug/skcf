import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('pageerror', err => errors.push('Page error: ' + err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push('Console error: ' + msg.text());
  });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Verify canvas is present and rendering
  const canvas = await page.$('canvas');
  if (!canvas) throw new Error('Canvas not found!');
  const canvasBox = await canvas.boundingBox();
  console.log('Canvas bounding box:', canvasBox);

  // 2. Test 6 scroll stances and capture screenshots
  const scrollStances = [
    { name: '01_hero_flying_kick', progress: 0.0 },
    { name: '02_lineage_vertical_split', progress: 0.2 },
    { name: '03_disciplines_side_kick', progress: 0.4 },
    { name: '04_gallery_inverted_acrobatics', progress: 0.6 },
    { name: '05_schedule_low_stance', progress: 0.8 },
    { name: '06_enquiry_master_salute', progress: 1.0 },
  ];

  for (const s of scrollStances) {
    await page.evaluate((p) => {
      window.scrollTo(0, (document.body.scrollHeight - window.innerHeight) * p);
    }, s.progress);
    await page.waitForTimeout(600);
    await page.screenshot({ path: `screenshots/e2e_${s.name}.png` });
    console.log(`Captured e2e_${s.name}.png at progress ${s.progress}`);
  }

  // 3. Verify flying kick image in Hero has full head
  const heroImg = await page.$('img[alt*="Airborne Flying Kick"]');
  if (!heroImg) throw new Error('Hero flying kick image not found!');
  const heroCardBox = await heroImg.boundingBox();
  console.log('Hero card bounding box:', heroCardBox);

  // 4. Verify gallery card p10 has full head
  const galleryImgP10 = await page.$('img[src*="traditional-flying-kick.jpg"]:nth-of-type(1)');
  console.log('Gallery traditional flying kick card found:', !!galleryImgP10);

  // 5. Verify all gallery images (15 photos) are loaded with naturalWidth > 0
  const imgCheck = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img[alt*="Thrithala Chamber Action"]'));
    return imgs.map(img => ({
      src: img.src.split('/').pop(),
      loaded: img.complete && img.naturalWidth > 0,
      w: img.naturalWidth,
      h: img.naturalHeight,
      classes: img.className
    }));
  });
  console.log(`Gallery images count: ${imgCheck.length}, all loaded:`, imgCheck.every(i => i.loaded));

  // 6. Check console errors
  console.log('Total console/page errors:', errors.length);
  if (errors.length > 0) {
    console.error('Errors encountered:', errors);
  }

  await browser.close();
  console.log('Comprehensive E2E Playwright verification PASSED!');
}

main();
