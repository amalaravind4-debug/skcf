import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function verify() {
  const browser = await chromium.launch({ headless: true });
  const outDir = path.resolve('screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const pausePoints = [
    { id: 'pause-hero', name: '01_hero_flying_kick' },
    { id: 'pause-lineage', name: '02_lineage_vertical_split' },
    { id: 'pause-disciplines', name: '03_disciplines_side_kick' },
    { id: 'pause-gallery', name: '04_gallery_inverted_acrobatics' },
    { id: 'pause-schedule', name: '05_schedule_low_stance' },
    { id: 'pause-enquiry', name: '06_enquiry_master_salute' },
  ];

  console.log('=== AUDITING DESKTOP VIEWPORT (1440x900) ===');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const desktopPage = await desktopContext.newPage();

  await desktopPage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(1000);

  // 1. Verify Official Logo
  const logoSelector = 'img[alt*="Official Logo"]';
  const isLogoLoaded = await desktopPage.evaluate((sel) => {
    const img = document.querySelector(sel);
    return img && img.complete && img.naturalWidth > 0;
  }, logoSelector);
  console.log('✓ Desktop Official Logo loaded:', isLogoLoaded);

  // 2. Verify Hero Stat Card ("100% Mat Covered Arena")
  const matArenaText = await desktopPage.evaluate(() => {
    const text = document.body.innerText;
    return text.includes('100% Mat') && text.includes('Covered Arena');
  });
  console.log('✓ "100% Mat Covered Arena" stat card present:', matArenaText);

  // 3. Verify Absence of Forbidden Terms
  const forbidden = await desktopPage.evaluate(() => {
    const text = document.body.innerText.toLowerCase();
    return {
      hasMuayThai: text.includes('muay thai'),
      hasTaekwondo: text.includes('taekwondo') || text.includes('teekwondo'),
      hasPulamanthole: text.includes('pulamanthole'),
    };
  });
  console.log('✓ Forbidden disciplines check (must be all false):', forbidden);

  // 4. Verify Google Search Console Auto-indexing tags & Schema.org
  const seoCheck = await desktopPage.evaluate(() => {
    const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content');
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    const schemaEl = document.querySelector('script[type="application/ld+json"]');
    let schemaValid = false;
    if (schemaEl) {
      try {
        const parsed = JSON.parse(schemaEl.textContent || '');
        schemaValid = parsed['@context'] === 'https://schema.org' && parsed.telephone === '+919048681719';
      } catch (e) {
        schemaValid = false;
      }
    }
    return { robots, canonical, schemaValid };
  });
  console.log('✓ Google Search Console SEO & Schema.org check:', seoCheck);

  // 5. Capture Desktop Screenshots for each pause point
  for (const p of pausePoints) {
    const el = await desktopPage.$(`#${p.id}`);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await desktopPage.waitForTimeout(700);
      const filePath = path.join(outDir, `desktop_final_${p.name}.png`);
      await desktopPage.screenshot({ path: filePath });
      console.log(`  -> Saved ${filePath}`);
    }
  }

  console.log('\n=== AUDITING MOBILE VIEWPORT (393x852) ===');
  const mobileContext = await browser.newContext({
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  // Mobile overflow check
  const mobileOverflow = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('✓ Mobile horizontal overflow detected (must be false):', mobileOverflow);

  // Mobile Logo check
  const mobileLogoLoaded = await mobilePage.evaluate((sel) => {
    const img = document.querySelector(sel);
    return img && img.complete && img.naturalWidth > 0;
  }, logoSelector);
  console.log('✓ Mobile Official Logo loaded:', mobileLogoLoaded);

  // Capture Mobile Screenshots for each pause point
  for (const p of pausePoints) {
    const el = await mobilePage.$(`#${p.id}`);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await mobilePage.waitForTimeout(700);
      const filePath = path.join(outDir, `mobile_final_${p.name}.png`);
      await mobilePage.screenshot({ path: filePath });
      console.log(`  -> Saved ${filePath}`);
    }
  }

  await browser.close();
  console.log('\n=== ALL PLAYWRIGHT AUDITS & SCREENSHOTS COMPLETED! ===');
}

verify().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
