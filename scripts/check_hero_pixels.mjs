import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/hero-flying-kick.jpg');
  
  const info = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Look at column where neck/fist is (around x = 600..750)
    // Find where purple robe ends and if there's skin or hair above it
    const samples = [];
    for (let y = 0; y < 100; y += 5) {
      for (let x = 600; x < 800; x += 20) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        // check if skin (r > 150, g > 100, b > 80, r > g && g > b)
        // or hair (dark, r < 60, g < 60, b < 60)
        // or purple robe (r ~ 130..170, g ~ 120..150, b ~ 150..190)
        samples.push({ x, y, rgb: [d[0], d[1], d[2]] });
      }
    }
    return { w: canvas.width, h: canvas.height, samples: samples.slice(0, 30) };
  });
  console.log('Image dimensions:', info.w, info.h);
  console.log('First 20 samples near top:');
  console.log(info.samples.slice(0, 20));
  await browser.close();
}

main();

