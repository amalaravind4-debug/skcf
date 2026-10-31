import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

  await page.setContent(`
    <!DOCTYPE html>
    <html><head><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="bg-black p-8 text-white">
      <h2 class="text-lg font-bold mb-4">Testing Framing for traditional-flying-kick.jpg in (380x260px) Card</h2>
      <div class="grid grid-cols-3 gap-6 max-w-5xl">
        <!-- Option A: Current (object-cover center) - HEAD CUT OFF -->
        <div>
          <p class="text-xs text-red-400 mb-1">Option A: Current (object-cover center)</p>
          <div class="w-[360px] h-[260px] rounded-3xl overflow-hidden border border-white/20 bg-zinc-950">
            <img src="http://localhost:5173/images/traditional-flying-kick.jpg" class="w-full h-full object-cover" />
          </div>
        </div>

        <!-- Option B: object-cover object-top -->
        <div>
          <p class="text-xs text-green-400 mb-1">Option B: object-cover object-top</p>
          <div class="w-[360px] h-[260px] rounded-3xl overflow-hidden border border-white/20 bg-zinc-950">
            <img src="http://localhost:5173/images/traditional-flying-kick.jpg" class="w-full h-full object-cover object-top" />
          </div>
        </div>

        <!-- Option C: object-contain p-2 -->
        <div>
          <p class="text-xs text-cyan-400 mb-1">Option C: object-contain p-2</p>
          <div class="w-[360px] h-[260px] rounded-3xl overflow-hidden border border-white/20 bg-zinc-950 p-2 flex items-center justify-center">
            <img src="http://localhost:5173/images/traditional-flying-kick.jpg" class="w-full h-full object-contain" />
          </div>
        </div>

        <!-- Option D: object-cover object-[center_15%] -->
        <div>
          <p class="text-xs text-yellow-400 mb-1">Option D: object-cover object-[center_15%]</p>
          <div class="w-[360px] h-[260px] rounded-3xl overflow-hidden border border-white/20 bg-zinc-950">
            <img src="http://localhost:5173/images/traditional-flying-kick.jpg" class="w-full h-full object-cover object-[center_15%]" />
          </div>
        </div>

        <!-- Option E: object-cover object-[center_20%] -->
        <div>
          <p class="text-xs text-purple-400 mb-1">Option E: object-cover object-[center_20%]</p>
          <div class="w-[360px] h-[260px] rounded-3xl overflow-hidden border border-white/20 bg-zinc-950">
            <img src="http://localhost:5173/images/traditional-flying-kick.jpg" class="w-full h-full object-cover object-[center_20%]" />
          </div>
        </div>
      </div>
    </body></html>
  `);

  await page.screenshot({ path: 'screenshots/test_framing_options.png', fullPage: true });
  console.log('Saved test_framing_options.png');
  await browser.close();
}

main();

