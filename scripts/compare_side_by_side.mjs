import { chromium } from 'playwright';

async function compareSideBySide() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 700 } });
  
  await page.setContent(`
    <!DOCTYPE html>
    <html><head><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="bg-black text-white p-6 flex gap-8">
      <div>
        <h2 class="text-sm font-bold mb-2">User's Uploaded Screenshot:</h2>
        <img src="file:///C:/Users/Amal Aravind/.gemini/antigravity/brain/fa468976-b1c3-4c62-b1fa-2178140d2808/.user_uploaded/media_1793458887140_cee265b6.jpg" class="h-96 border border-red-500 rounded-2xl" />
      </div>
      <div>
        <h2 class="text-sm font-bold mb-2">traditional-flying-kick.jpg (Source):</h2>
        <img src="http://localhost:5173/images/traditional-flying-kick.jpg" class="h-96 border border-green-500 rounded-2xl" />
      </div>
      <div>
        <h2 class="text-sm font-bold mb-2">hero-flying-kick.jpg:</h2>
        <img src="http://localhost:5173/images/hero-flying-kick.jpg" class="h-96 border border-blue-500 rounded-2xl" />
      </div>
    </body></html>
  `);

  await page.screenshot({ path: 'screenshots/side_by_side_comparison.png', fullPage: true });
  console.log('Saved side_by_side_comparison.png');
  await browser.close();
}

compareSideBySide();

