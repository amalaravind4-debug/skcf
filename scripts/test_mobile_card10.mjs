import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 393, height: 852 } });

  await page.setContent(`
    <!DOCTYPE html>
    <html><head><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="bg-black p-4 text-white">
      <h2 class="text-sm font-bold mb-2">Mobile Test: Card 10 (auto-rows-[220px])</h2>
      
      <!-- Current (cut off) -->
      <div class="mb-4">
        <p class="text-xs text-red-400 mb-1">Current (object-cover center)</p>
        <div class="w-full h-[220px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
          <img src="http://localhost:5173/images/traditional-flying-kick.jpg" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Fixed (object-cover object-top) -->
      <div class="mb-4">
        <p class="text-xs text-green-400 mb-1">Fixed (object-cover object-top)</p>
        <div class="w-full h-[220px] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
          <img src="http://localhost:5173/images/traditional-flying-kick.jpg" class="w-full h-full object-cover object-top" />
        </div>
      </div>
    </body></html>
  `);

  await page.screenshot({ path: 'screenshots/mobile_card10_test.png', fullPage: true });
  console.log('Saved mobile_card10_test.png');
  await browser.close();
}

main();

