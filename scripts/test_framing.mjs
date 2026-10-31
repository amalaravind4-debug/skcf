import { chromium } from 'playwright';

async function testFraming() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-black p-8 flex flex-wrap gap-8">
      <!-- Option 1: object-cover object-top -->
      <div class="w-80 aspect-[4/3] rounded-3xl overflow-hidden border border-white/20 bg-zinc-950">
        <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" class="w-full h-full object-cover object-top" />
      </div>

      <!-- Option 2: object-cover object-[center_15%] -->
      <div class="w-80 aspect-[4/3] rounded-3xl overflow-hidden border border-white/20 bg-zinc-950">
        <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" class="w-full h-full object-cover object-[center_15%]" />
      </div>

      <!-- Option 3: object-contain with stylish dojo padding -->
      <div class="w-80 aspect-[4/3] rounded-3xl overflow-hidden border border-white/20 bg-zinc-950 p-2">
        <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" class="w-full h-full object-contain" />
      </div>

      <!-- Option 4: aspect-[3/2] object-cover object-top -->
      <div class="w-80 aspect-[3/2] rounded-3xl overflow-hidden border border-white/20 bg-zinc-950">
        <img src="file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/public/images/hero-flying-kick.jpg" class="w-full h-full object-cover object-top" />
      </div>
    </body>
    </html>
  `);

  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/framing_test_options.png', fullPage: true });
  console.log('Saved framing options test to screenshots/framing_test_options.png');
  await browser.close();
}

testFraming();

