import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1000, height: 600 } });

  await page.setContent(`
    <!DOCTYPE html>
    <html><head><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="bg-black p-8 text-white flex gap-8">
      <div>
        <h3 class="text-sm font-bold text-red-400 mb-2">Before Fix (from user report)</h3>
        <div class="rounded-3xl overflow-hidden border border-red-500 bg-zinc-950">
          <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/live_flying_img_21.png" style="width:394px; height:259px;" />
        </div>
      </div>

      <div>
        <h3 class="text-sm font-bold text-green-400 mb-2">After Fix (Live Verified with Playwright)</h3>
        <div class="rounded-3xl overflow-hidden border border-green-500 bg-zinc-950">
          <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/verified_desktop_kick_card_3.png" style="width:394px; height:259px;" />
        </div>
      </div>
    </body></html>
  `);

  await page.screenshot({ path: 'screenshots/before_vs_after_card10.png' });
  console.log('Saved screenshots/before_vs_after_card10.png');
  await browser.close();
}

main();

