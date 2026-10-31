import { chromium } from 'playwright';

async function testGalleryCell() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="bg-black p-6 flex flex-wrap gap-6 text-white text-xs">
      <!-- Option A: object-cover object-top -->
      <div>
        <p class="mb-1">object-cover object-top</p>
        <div class="w-[500px] h-[480px] rounded-3xl overflow-hidden border border-amber-500 bg-zinc-950">
          <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" class="w-full h-full object-cover object-top" />
        </div>
      </div>

      <!-- Option B: object-contain -->
      <div>
        <p class="mb-1">object-contain p-2</p>
        <div class="w-[500px] h-[480px] rounded-3xl overflow-hidden border border-amber-500 bg-zinc-950 p-2">
          <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" class="w-full h-full object-contain" />
        </div>
      </div>

      <!-- Option C: object-cover object-[center_15%] -->
      <div>
        <p class="mb-1">object-cover object-[center_15%]</p>
        <div class="w-[500px] h-[480px] rounded-3xl overflow-hidden border border-amber-500 bg-zinc-950">
          <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" class="w-full h-full object-cover object-[center_15%]" />
        </div>
      </div>
    </body>
    </html>
  `);

  await page.screenshot({ path: 'screenshots/test_gallery_head.png', fullPage: true });
  console.log('Saved test_gallery_head.png');
  await browser.close();
}

testGalleryCell();

