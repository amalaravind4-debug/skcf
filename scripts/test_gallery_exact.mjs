import { chromium } from 'playwright';

async function testGalleryExact() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.setContent(`
    <!DOCTYPE html>
    <html><head><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="bg-black p-8">
      <div class="grid grid-cols-3 auto-rows-[260px] gap-4 max-w-6xl">
        <!-- Option 1: object-cover object-top -->
        <div class="col-span-2 row-span-2 rounded-3xl overflow-hidden border border-white/20 bg-zinc-950">
          <p class="text-white text-xs p-2 absolute z-10 bg-black/60">Option 1: object-cover object-top</p>
          <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" class="w-full h-full object-cover object-top" />
        </div>

        <!-- Option 2: object-contain p-2 -->
        <div class="col-span-2 row-span-2 rounded-3xl overflow-hidden border border-white/20 bg-zinc-950 p-2">
          <p class="text-white text-xs p-2 absolute z-10 bg-black/60">Option 2: object-contain p-2</p>
          <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" class="w-full h-full object-contain" />
        </div>
      </div>
    </body>
    </html>
  `);

  await page.screenshot({ path: 'screenshots/exact_gallery_test.png', fullPage: true });
  console.log('Saved screenshots/exact_gallery_test.png');
  await browser.close();
}

testGalleryExact();

