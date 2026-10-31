import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 700 } });

  await page.setContent(`
    <!DOCTYPE html>
    <html><head><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="bg-black p-8 text-white flex gap-8">
      <div>
        <h3 class="text-sm font-bold text-red-400 mb-2">Current (object-cover center): Head is cut off</h3>
        <div class="w-[394px] h-[259px] rounded-3xl overflow-hidden border border-white/20 bg-zinc-950">
          <img src="http://localhost:5173/images/traditional-flying-kick.jpg" class="w-full h-full object-cover" />
        </div>
      </div>

      <div>
        <h3 class="text-sm font-bold text-green-400 mb-2">Fixed with object-cover object-top: Full Head & Body!</h3>
        <div class="w-[394px] h-[259px] rounded-3xl overflow-hidden border border-white/20 bg-zinc-950">
          <img src="http://localhost:5173/images/traditional-flying-kick.jpg" class="w-full h-full object-cover object-top" />
        </div>
      </div>

      <div>
        <h3 class="text-sm font-bold text-cyan-400 mb-2">Fixed with object-contain: 100% Intact</h3>
        <div class="w-[394px] h-[259px] rounded-3xl overflow-hidden border border-white/20 bg-zinc-950 p-2 flex items-center justify-center">
          <img src="http://localhost:5173/images/traditional-flying-kick.jpg" class="w-full h-full object-contain" />
        </div>
      </div>
    </body>
    </html>
  `);

  await page.screenshot({ path: 'screenshots/side_by_side_fix.png' });
  console.log('Saved side_by_side_fix.png');
  await browser.close();
}

main();

