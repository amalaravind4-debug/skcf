import { chromium } from 'playwright';

async function checkKicks() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="bg-zinc-900 p-6 flex flex-wrap gap-6 text-white text-xs">
      <div class="border p-2">
        <p>hero-flying-kick.jpg</p>
        <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" class="h-64 object-contain" />
      </div>
      <div class="border p-2">
        <p>flying-kick.jpg</p>
        <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/flying-kick.jpg" class="h-64 object-contain" />
      </div>
      <div class="border p-2">
        <p>traditional-flying-kick.jpg</p>
        <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/traditional-flying-kick.jpg" class="h-64 object-contain" />
      </div>
      <div class="border p-2">
        <p>media_1793444438972_30f9ce04.jpg</p>
        <img src="file:///C:/Users/Amal Aravind/.gemini/antigravity/brain/fa468976-b1c3-4c62-b1fa-2178140d2808/.user_uploaded/media_1793444438972_30f9ce04.jpg" class="h-64 object-contain" />
      </div>
    </body>
    </html>
  `);

  await page.screenshot({ path: 'screenshots/compare_flying_kicks.png', fullPage: true });
  console.log('Saved compare_flying_kicks.png');
  await browser.close();
}

checkKicks();

