import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 393, height: 852 } });

  await page.setContent(`
    <!DOCTYPE html>
    <html><head><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="bg-black p-4 text-white">
      <!-- Option 1: object-top -->
      <div class="mb-4">
        <p class="text-xs text-amber-400 mb-1">Option 1: object-cover object-top</p>
        <div id="c1" class="w-full h-[220px] rounded-2xl overflow-hidden border border-white/20 bg-zinc-950">
          <img src="http://localhost:5173/images/traditional-flying-kick.jpg" class="w-full h-full object-cover object-top" />
        </div>
      </div>

      <!-- Option 2: object-[center_5%] -->
      <div class="mb-4">
        <p class="text-xs text-amber-400 mb-1">Option 2: object-cover object-[center_5%]</p>
        <div id="c2" class="w-full h-[220px] rounded-2xl overflow-hidden border border-white/20 bg-zinc-950">
          <img src="http://localhost:5173/images/traditional-flying-kick.jpg" class="w-full h-full object-cover object-[center_5%]" />
        </div>
      </div>

      <!-- Option 3: object-contain p-2 -->
      <div class="mb-4">
        <p class="text-xs text-amber-400 mb-1">Option 3: object-contain p-2</p>
        <div id="c3" class="w-full h-[220px] rounded-2xl overflow-hidden border border-white/20 bg-zinc-950 p-2 flex items-center justify-center">
          <img src="http://localhost:5173/images/traditional-flying-kick.jpg" class="w-full h-full object-contain" />
        </div>
      </div>
    </body></html>
  `);

  await page.screenshot({ path: 'screenshots/mobile_options_detail.png', fullPage: true });
  console.log('Saved mobile_options_detail.png');
  await browser.close();
}

main();

