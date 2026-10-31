import { chromium } from 'playwright';

async function testHeadFit() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1000, height: 600 } });
  await page.setContent(`
    <!DOCTYPE html>
    <html><head><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="bg-black p-4 flex gap-4">
      <div id="contain" class="w-[400px] h-[340px] rounded-3xl overflow-hidden border border-amber-500 bg-zinc-950 p-2">
        <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" class="w-full h-full object-contain" />
      </div>
      <div id="cover-top" class="w-[400px] h-[340px] rounded-3xl overflow-hidden border border-amber-500 bg-zinc-950">
        <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" class="w-full h-full object-cover object-top" />
      </div>
    </body>
    </html>
  `);

  const elContain = await page.$('#contain');
  await elContain.screenshot({ path: 'screenshots/hero_kick_contain.png' });
  const elCoverTop = await page.$('#cover-top');
  await elCoverTop.screenshot({ path: 'screenshots/hero_kick_cover_top.png' });
  console.log('Saved screenshots for contain and cover-top');
  await browser.close();
}

testHeadFit();

