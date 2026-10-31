import { chromium } from 'playwright';

async function checkActualPixels() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/hero-flying-kick.jpg');
  
  // Crop a 300x300 patch around the top-center where the head would be
  const headPatch = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Let's sample colors at various Y down the center column X = 512
    const samples = [];
    for (let y = 0; y < 200; y += 10) {
      const d = ctx.getImageData(512, y, 1, 1).data;
      samples.push({ y, rgb: [d[0], d[1], d[2]] });
    }
    return samples;
  });

  console.log('Center column samples from y=0 to 200:', headPatch);
  await browser.close();
}

checkActualPixels();

