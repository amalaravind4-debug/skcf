import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Test inside the actual gallery grid row
  await page.setContent(`
    <!DOCTYPE html>
    <html><head><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="bg-black p-8 text-white">
      <h2 class="text-xl font-bold mb-4">Gallery 3-Card Row Test</h2>
      <div class="grid grid-cols-3 gap-4 max-w-6xl">
        <!-- Card 9: aerial-side-kick-grass.jpg -->
        <div class="rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 h-[260px]">
          <img src="http://localhost:5173/images/aerial-side-kick-grass.jpg" class="w-full h-full object-cover" />
        </div>

        <!-- Card 10 with object-cover object-top -->
        <div class="rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 h-[260px] relative">
          <p class="absolute top-2 left-2 text-xs bg-black/70 px-2 py-0.5 rounded text-green-400 z-10">object-cover object-top</p>
          <img src="http://localhost:5173/images/traditional-flying-kick.jpg" class="w-full h-full object-cover object-top" />
        </div>

        <!-- Card 11: indoor-acrobatic-stunt.png -->
        <div class="rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 h-[260px]">
          <img src="http://localhost:5173/images/indoor-acrobatic-stunt.png" class="w-full h-full object-cover" />
        </div>
      </div>

      <h2 class="text-xl font-bold my-4">Comparison with object-contain</h2>
      <div class="grid grid-cols-3 gap-4 max-w-6xl">
        <div class="rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 h-[260px]">
          <img src="http://localhost:5173/images/aerial-side-kick-grass.jpg" class="w-full h-full object-cover" />
        </div>

        <!-- Card 10 with object-contain -->
        <div class="rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 h-[260px] relative flex items-center justify-center p-2">
          <p class="absolute top-2 left-2 text-xs bg-black/70 px-2 py-0.5 rounded text-cyan-400 z-10">object-contain</p>
          <img src="http://localhost:5173/images/traditional-flying-kick.jpg" class="w-full h-full object-contain" />
        </div>

        <div class="rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 h-[260px]">
          <img src="http://localhost:5173/images/indoor-acrobatic-stunt.png" class="w-full h-full object-cover" />
        </div>
      </div>
    </body></html>
  `);

  await page.screenshot({ path: 'screenshots/gallery_row_comparison.png', fullPage: true });
  console.log('Saved screenshots/gallery_row_comparison.png');
  await browser.close();
}

main();

