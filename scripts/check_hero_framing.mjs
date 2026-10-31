import { chromium } from 'playwright';

async function checkHeroFraming() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="bg-black p-6 flex gap-6">
      <div class="w-80 aspect-[4/3] rounded-3xl overflow-hidden border border-amber-500/50 bg-zinc-950">
        <p class="text-white text-xs p-1">object-cover object-top</p>
        <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" class="w-full h-full object-cover object-top" />
      </div>
      <div class="w-80 aspect-[4/3] rounded-3xl overflow-hidden border border-amber-500/50 bg-zinc-950 p-2">
        <p class="text-white text-xs p-1">object-contain</p>
        <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" class="w-full h-full object-contain" />
      </div>
      <div class="w-80 aspect-[4/3] rounded-3xl overflow-hidden border border-amber-500/50 bg-zinc-950">
        <p class="text-white text-xs p-1">object-[center_20%]</p>
        <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" class="w-full h-full object-cover object-[center_20%]" />
      </div>
    </body>
    </html>
  `);
  await page.screenshot({ path: 'screenshots/hero_framing_result.png' });
  console.log('Saved hero_framing_result.png');
  await browser.close();
}

checkHeroFraming();

