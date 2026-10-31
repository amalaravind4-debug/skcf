import { chromium } from 'playwright';
import fs from 'fs';

async function generateVisualCatalog() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1400 } });

  const imgs = fs.readdirSync('public/images').filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

  await page.setContent(`
    <!DOCTYPE html>
    <html><head><script src="https://cdn.tailwindcss.com"></script></head>
    <body class="bg-zinc-950 p-6 text-white">
      <h1 class="text-xl font-bold mb-4">Visual Image Catalog</h1>
      <div class="grid grid-cols-4 gap-4">
        ${imgs.map(img => `
          <div class="border border-white/20 rounded-xl p-2 bg-zinc-900">
            <p class="text-xs font-mono text-amber-400 truncate mb-1">${img}</p>
            <div class="h-44 w-full bg-black flex items-center justify-center overflow-hidden rounded-lg">
              <img src="http://localhost:5173/images/${img}" class="max-h-full max-w-full object-contain" />
            </div>
          </div>
        `).join('')}
      </div>
    </body></html>
  `);

  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/visual_catalog_all.png', fullPage: true });
  console.log('Saved visual_catalog_all.png');
  await browser.close();
}

generateVisualCatalog();

